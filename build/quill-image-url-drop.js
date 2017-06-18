window.QuillImageUrlDrop = (function() {
  function _Class(quill, options) {
    this.quill = quill;
    this.options = options;
    this.observeDOM((function(_this) {
      return function() {
        var images;
        images = document.querySelector(_this.options.container + " img");
        if (images) {
          return images.addEventListener("dragstart", _this.handleDragStart, false);
        }
      };
    })(this));
    this.quill.root.addEventListener("drop", ((function(_this) {
      return function(event) {
        return _this.handleDrop(event);
      };
    })(this)), false);
  }

  _Class.prototype.observeDOM = function(callback) {
    var config, observer, target;
    target = document.querySelector("body");
    observer = new MutationObserver(function(mutations) {
      if (mutations.length > 0) {
        return callback();
      }
    });
    config = {
      childList: true,
      subtree: true
    };
    return observer.observe(target, config);
  };

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
