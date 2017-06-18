window.QuillImageUrlDrop = class
  constructor: (@quill, @options) ->
    @observeDOM =>
      images = document.querySelector("#{@options.container} img")
      images.addEventListener "dragstart", @handleDragStart, false if images
    @quill.root.addEventListener "drop", ((event)=>@handleDrop(event)), false

  observeDOM: (callback) ->
    target = document.querySelector "body"
    observer = new MutationObserver (mutations) ->
      if mutations.length > 0
        callback()
    config = { childList: true, subtree: true }
    observer.observe target, config

  handleDragStart: (event) ->
    url = event.target.attributes['data-url'].nodeValue
    event.dataTransfer.setData "QuillImageUrlDrop.imageUrl", url
  handleDrop: (event) ->
    event.preventDefault()
    imageUrl = event.dataTransfer.getData "QuillImageUrlDrop.imageUrl"
    if imageUrl
      index = (@quill.getSelection() || {}).index
      # index can be 0 (start of text), but JS's 0 == false messes things up
      index = @quill.getLength() if index == null
      @quill.insertEmbed index, "image", imageUrl