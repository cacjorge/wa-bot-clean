'use strict'

/**
 * Returns a media url
 * @func  mediaUrl
 * @param {String} protocol  The protocol used for the URL
 * @param {String} board     Board shortname, eg. 'b'
 * @param {Number} timestamp Unix timestamp of the webm
 */
function mediaUrl (protocol, board, timestamp,ext) {
  return `${protocol}://i.4cdn.org/${board}/${timestamp}${ext}`
}

/**
 * Returns a thumbnail url
 * @func  thumbUrl
 * @param {String} protocol  The protocol used for the URL
 * @param {String} board     Board shortname, eg. 'b'
 * @param {Number} timestamp Unix timestamp of the thumbnail
 */
function thumbUrl (protocol, board, timestamp) {
  return `${protocol}://i.4cdn.org/${board}/${timestamp}s.jpg`
}

/**
 * Returns whether the file is media
 * @func    isImage
 * @param   {String}  file The filename of the file
 * @returns {Boolean}      True if *.jpg or .jpeg or .png
 */
function isMedia (file) {
	return (file.ext ==='.png' || file.ext === '.jpg' || file.ext === '.jpeg' || file.ext === '.webm')

}

/**
 * Transforms a 4chan thread payload into a JSON with media data
 * @func    transform
 * @param   {Object} raw      Raw thread JSON payload
 * @param   {String} protocol Protocol to use for generating links
 * @param   {String} board    Board shortname, eg. 'b'
 * @returns {Object}          JSON containing thread subject and webm data
 */
function transform(raw, protocol, board) {
  const reducer = (acc, file) => acc.concat([{
    filename: file.tim,
    url: mediaUrl(protocol, board, file.tim,file.ext),
	ext: file.ext,
    thumbnail: thumbUrl(protocol, board, file.tim,file.ext)
  }])

  const payload = {
    media: raw.posts.filter(isMedia).reduce(reducer, [])
	
  }

  if (raw.posts[0].sub) {
	  payload.subject = raw.posts[0].sub;
  }

  return payload
}
module.exports = transform

