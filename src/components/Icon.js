import Vue from 'vue'
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

const OhVueIcon = Vue.component('OhVueIcon', {
  name: 'OhVueIcon',
  props: {
    name: {
      type: String,
      validator: function (val) {
        if (val && !(val in icons)) {
          console.warn(`Invalid prop: prop "name" is referring to an unregistered icon "${val}".\n` +
            `Please make sure you have imported this icon before using it.`);
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
  data() {
    return {
      children: [],
      outerScale: 1.2,
      x: null,
      y: null
    };
  },
  computed: {
    normalizedScale() {
      const scale = Number(this.scale);
      if (isNaN(scale) || scale <= 0) {
        console.warn(`Invalid prop: prop "scale" should be a number over 0.`);
        return this.outerScale;
      }
      return scale * this.outerScale;
    },
    icon() {
      return icons[this.name];
    },
    box() {
      const icon = this.icon;
      if (icon) {
        return `${icon.minX} ${icon.minY} ${icon.width} ${icon.height}`;
      }
      return `0 0 ${this.width} ${this.height}`;
    },
    raw() {
      // Generates unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) return null;

      const ids = {};
      let raw = this.icon.raw;

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
    },
    ratio() {
      const icon = this.icon;
      if (!icon) return 1;
      return Math.max(icon.width, icon.height) / 16;
    },
    width() {
      return this.icon ? (this.icon.width / this.ratio) * this.normalizedScale : 0;
    },
    height() {
      return this.icon ? (this.icon.height / this.ratio) * this.normalizedScale : 0;
    },
    style() {
      if (this.normalizedScale === 1) return {};
      return {
        fontSize: this.normalizedScale + 'em'
      };
    },
    klass() {
      return {
        'ov-icon': true,
        'ov-inverse': this.inverse,
        'ov-flip-horizontal': this.flip === 'horizontal',
        'ov-flip-vertical': this.flip === 'vertical',
        'ov-flip-both': this.flip === 'both',
        'ov-spin': this.animation === 'spin',
        'ov-spin-pulse': this.animation === 'spin-pulse',
        'ov-wrench': this.animation === 'wrench',
        'ov-ring': this.animation === 'ring',
        'ov-pulse': this.animation === 'pulse',
        'ov-flash': this.animation === 'flash',
        'ov-float': this.animation === 'float',
        'ov-hover': this.hover,
        'ov-fast': this.speed === 'fast',
        'ov-slow': this.speed === 'slow'
      };
    },
    attribs() {
      if (!this.icon || !this.icon.attr) return {};
      return this.icon.attr;
    }
  },
  methods: {
    updateStack() {
      if (!this.name && this.name !== null && this.children.length === 0) {
        console.warn(`Invalid prop: prop "name" is required.`);
        return;
      }

      if (this.icon) return;

      let width = 0, height = 0;
      this.children.forEach((child) => {
        child.outerScale = this.normalizedScale;
        width = Math.max(width, child.width);
        height = Math.max(height, child.height);
      });

      this.children.forEach((child) => {
        child.x = (width - child.width) / 2;
        child.y = (height - child.height) / 2;
      });
    }
  },
  mounted() {
    this.updateStack();
  },
  updated() {
    this.updateStack();
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
  
    if (this.attribs.stroke) {
      attrs.stroke = this.fill ? this.fill : "currentColor";
    } else {
      attrs.fill = this.fill ? this.fill : "currentColor";
    }
  
    if (this.x) attrs.x = this.x.toString();
    if (this.y) attrs.y = this.y.toString();
  
    let options = {
      class: this.klass,
      style: this.style,
      attrs: attrs
    };
  
    if (this.raw) {
      const html = this.title
        ? `<title>${this.escapeHTML(this.title)}</title>${this.raw}`
        : this.raw;
      options.domProps = { innerHTML: html };
    }
  
    const content = this.title ? [this.$createElement("title", this.title)] : [];
  
    const createSVGElement = (name, value, i) => {
      return this.$createElement(name, {
        attrs: value,
        key: `${name}-${i}`
      });
    };
  
    return this.$createElement(
      "svg",
      options,
      this.raw
        ? undefined
        : content.concat(
            this.$slots.default || 
            (this.icon ? [
              ...this.icon.paths.map((path, i) => createSVGElement("path", path, i)),
              ...this.icon.polygons.map((polygon, i) => createSVGElement("polygon", polygon, i))
            ] : [])
        ))
  }
});


export { OhVueIcon, addIcons };