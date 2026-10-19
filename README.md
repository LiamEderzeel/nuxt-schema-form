# Nuxt Schema Form

Runtime form generation for Nuxt apps. Describe a form as JSON Schema and get the fields, validation and layout at runtime, rendered with Nuxt UI components.

- 📖 [Documentation](https://liamederzeel.github.io/nuxt-schema-form/docs/getting-started)
- ▶️ [Live demo](https://liamederzeel.github.io/nuxt-schema-form/demo): edit a schema and watch the form update as you type

## 🚀 Install

1. Install the `@ederzeel/nuxt-schema-form` module in your project:

```bash
npx nuxi module add @ederzeel/nuxt-schema-form
```

2. Import the module's styles in your main CSS file, after Nuxt UI:

```css
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@ederzeel/nuxt-schema-form';
```

Then render a form from your schema with `SForm`. The [usage guide](https://liamederzeel.github.io/nuxt-schema-form/docs/getting-started/form) shows how, and the [documentation](https://liamederzeel.github.io/nuxt-schema-form/docs/getting-started) covers validation, layouts and custom renderers.
