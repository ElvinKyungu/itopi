const getImg = (project) => {
  if (project.item.fields.Attachments && project.item.fields.Attachments.length >= 1) {
    return project.item.fields.Attachments[0].thumbnails.large.url
  }
  return null
}

const getTags = (project) => {
  let tags = []
  if (project.item.fields.hasOwnProperty('Installation_type')) {
    tags = tags.concat(project.item.fields.Installation_type)
  }
  if (project.item.fields.hasOwnProperty('Mots_clefs')) {
    tags = tags.concat(project.item.fields.Mots_clefs)
  }
  return tags
}

export { getImg, getTags }