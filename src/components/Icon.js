import {
defineComponent,
reactive,
computed,
onMounted,
onUpdated,
toRefs,
ref,
h,
isVue2
} from "vue-demi";

import utils from "../utils";


const icons = {};

const register = (data) => {
const { name, paths = [], d, polygons = [], points } = data;

if (d) paths.push({ d });
if (points) polygons.push({ points });

icons[name] = Object.assign({}, data, {
  paths,
  polygons
});

if (!icons[name].minX) icons[name].minX = 0;
if (!icons[name].minY) icons[name].minY = 0;
};

const addIcons = (...data) => {
for (const icon of data) register(icon);
};

const OhVueIcon = defineComponent({
name: "OhVueIcon",

props: {
  name: {
    type: String,
    validator: (val) => {
      if (val && !(val in icons)) {
        console.warn(
          `Invalid prop: prop "name" is referring to an unregistered icon "${val}".\n` +
            `Please make sure you have imported this icon before using it.`
        );
        return false;
      }
      return true;
    }
  },
  title: String,
  fill: String,
  scale: {
    type: [Number, String],
    default: 1
  },
  animation: {
    validator: (val) => {
      return [
        "spin",
        "spin-pulse",
        "wrench",
        "ring",
        "pulse",
        "flash",
        "float"
      ].includes(val);
    }
  },
  hover: Boolean,
  flip: {
    validator: (val) => {
      return ["horizontal", "vertical", "both"].includes(val);
    }
  },
  speed: {
    validator: (val) => {
      return val === "fast" || val === "slow";
    }
  },
  label: String,
  inverse: Boolean
},

setup(props) {
  const children = ref([]);

  const state = reactive({
    outerScale: 1.2,
    x: null,
    y: null
  });

  const childrenState = reactive({
    width: 0,
    height: 0
  });

  const normalizedScale = computed(() => {
    const scale = Number(props.scale);
    if (isNaN(scale) || scale <= 0) {
      console.warn(`Invalid prop: prop "scale" should be a number over 0.`);
      return state.outerScale;
    }
    return scale * state.outerScale;
  });

  const klass = computed(() => {
    const classes = {
      "ov-icon": true,
      "ov-inverse": props.inverse,
      "ov-flip-horizontal": props.flip === "horizontal",
      "ov-flip-vertical": props.flip === "vertical",
      "ov-flip-both": props.flip === "both",
      "ov-spin": props.animation === "spin",
      "ov-spin-pulse": props.animation === "spin-pulse",
      "ov-wrench": props.animation === "wrench",
      "ov-ring": props.animation === "ring",
      "ov-pulse": props.animation === "pulse",
      "ov-flash": props.animation === "flash",
      "ov-float": props.animation === "float",
      "ov-hover": props.hover,
      "ov-fast": props.speed === "fast",
      "ov-slow": props.speed === "slow"
    };
    return classes;
  });

  const icon = computed(() => {
    if (props.name) return icons[props.name];
    return null;
  });

  const box = computed(() => {
    if (icon.value) {
      return `${icon.value.minX} ${icon.value.minY} ${icon.value.width} ${icon.value.height}`;
    }
    return `0 0 ${width.value} ${height.value}`;
  });

  const ratio = computed(() => {
    if (!icon.value) return 1;

    const { width, height } = icon.value;
    return Math.max(width, height) / 16;
  });

  const width = computed(() => {
    return (
      childrenState.width ||
      (icon.value &&
        (icon.value.width / ratio.value) * normalizedScale.value) ||
      0
    );
  });

  const height = computed(() => {
    return (
      childrenState.height ||
      (icon.value &&
        (icon.value.height / ratio.value) * normalizedScale.value) ||
      0
    );
  });

  const style = computed(() => {
    if (normalizedScale.value === 1) return false;
    return {
      fontSize: normalizedScale.value + "em"
    };
  });

  const raw = computed(() => {
    if (!icon.value || !icon.value.raw) return null;

    const ids = {};
    let raw = icon.value.raw;

    raw = raw.replace(
      /\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g,
      (match, quote, id) => {
        const uniqueId = utils.getID("vat-");
        ids[id] = uniqueId;
        return ` id="${uniqueId}"`;
      }
    );
    raw = raw.replace(
      /#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,
      (match, rawId, _, pointerId) => {
        const id = rawId || pointerId;
        if (!id || !ids[id]) return match;
        return `#${ids[id]}`;
      }
    );
    return raw;
  });

  const attribs = computed(() => {
    if (!icon.value || !icon.value.attr) return {};
    return icon.value.attr;
  });

  const updateStack = () => {
    if (!props.name && props.name !== null && children.value.length === 0) {
      console.warn(`Invalid prop: prop "name" is required.`);
      return;
    }

    if (icon.value) return;

    let width = 0,
      height = 0;

    children.value.forEach((child) => {
      child.outerScale = normalizedScale.value;

      width = Math.max(width, child.width);
      height = Math.max(height, child.height);
    });

    childrenState.width = width;
    childrenState.height = height;

    children.value.forEach((child) => {
      child.x = (width - child.width) / 2;
      child.y = (height - child.height) / 2;
    });
  };

  onMounted(() => {
    updateStack();
  });

  onUpdated(() => {
    updateStack();
  });

  return {
    ...toRefs(state),
    children,
    icon,
    klass,
    style,
    width,
    height,
    box,
    attribs,
    raw
  };
},

created() {
  const parent = this.$parent;
  if (parent && parent.children) parent.children.push(this);
},

render() {
  const attrs = Object.assign(
    {
      role: this.$attrs.role || (this.label || this.title ? "img" : null),
      "aria-label": this.label || null,
      "aria-hidden": !(this.label || this.title),
      width: this.width,
      height: this.height,
      viewBox: this.box
    },
    this.attribs
  );

  if (this.attribs.stroke)
    attrs.stroke = this.fill ? this.fill : "currentColor";
  else attrs.fill = this.fill ? this.fill : "currentColor";

  if (this.x) attrs.x = this.x.toString();
  if (this.y) attrs.y = this.y.toString();

  let options = {
    class: this.klass,
    style: this.style
  };

  if (isVue2) {
    options.attrs = attrs;
  } else {
    options = Object.assign(options, attrs);
  }

  if (this.raw) {
    const html = this.title
      ? `<title>${utils.escapeHTML(this.title)}</title>${this.raw}`
      : this.raw;

    if (isVue2) {
      options.domProps = { innerHTML: html };
    } else {
      options.innerHTML = html;
    }
  }

  const content = this.title ? [h("title", this.title)] : [];

  const svgAttrs = (name, value, i) => {
    if (isVue2) {
      return h(name, {
        attrs: value,
        key: `${name}-${i}`
      });
    } else {
      return h(name, {
        ...value,
        key: `${name}-${i}`
      });
    }
  };

  return h(
    "svg",
    options,
    this.raw
      ? undefined
      : content.concat([
          this.$slots.default
            ? isVue2
              ? this.$slots.default
              : this.$slots.default()
            : this.icon
            ? [
                ...this.icon.paths.map((path, i) =>
                  svgAttrs("path", path, i)
                ),
                ...this.icon.polygons.map((polygon, i) =>
                  svgAttrs("polygon", polygon, i)
                )
              ]
            : []
        ])
  );
}
});

export { OhVueIcon, addIcons };
