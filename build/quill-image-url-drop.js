window.QuillImageUrlDrop = (function() {
  function _Class(quill, options) {
    this.quill = quill;
    this.options = options;
    document.querySelector(this.options.container + " img").addEventListener("dragstart", this.handleDragStart, false);
    this.quill.root.addEventListener("drop", ((function(_this) {
      return function(event) {
        return _this.handleDrop(event);
      };
    })(this)), false);
  }

  _Class.prototype.handleDragStart = function(event) {
    var url;
    url = event.target.attributes['data-url'].nodeValue;
    return event.dataTransfer.setData("QuillImageUrlDrop.imageUrl", url);
  };

  _Class.prototype.handleDrop = function(event) {
    var imageUrl, index;
    event.preventDefault();
    imageUrl = event.dataTransfer.getData("QuillImageUrlDrop.imageUrl");
    if (imageUrl) {
      index = (this.quill.getSelection() || {}).index;
      if (index === null) {
        index = this.quill.getLength();
      }
      return this.quill.insertEmbed(index, "image", imageUrl);
    }
  };

  return _Class;

})();
