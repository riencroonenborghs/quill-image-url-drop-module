# Quill Image URL Drop Module

A module for Quill rich text editor to allow images' URLs to be drag/dropped into the editor.

## Usage

### Script Tag

Copy quill-image-url-drop.js into your web root

```html
<script src="quill-image-url-drop-module.js"></script>
```

### Javascript

Register the module

```javascript
Quill.register("modules/imageUrlDrop", QuillImageUrlDrop);
```

Specify the container that holds the images you want to drag/drop.

```javascript
var quill = new Quill(editor, {
    // ...
    modules: {
      // ...
      imageUrlDrop: {
        container: ".some-container-holding-the-images-you-want-to-use"
      }
    }
});
```

### HTML

Add the container with the class specified in your JS.
Each image should have a `data-url` attribute containing the image's URL.

```html
<div class="some-container-holding-the-images-you-want-to-use">
  <img src="<URL>" data-url="<URL>" />
</div>
```