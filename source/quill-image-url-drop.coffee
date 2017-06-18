window.QuillImageUrlDrop = class
  constructor: (@quill, @options) ->
    images = document.querySelector("#{@options.container} img")
    images.addEventListener "dragstart", @handleDragStart, false if images
    @quill.root.addEventListener "drop", ((event)=>@handleDrop(event)), false
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