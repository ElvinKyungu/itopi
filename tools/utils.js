const getImg = (item, size = 'large') => {
  if (item?.item?.fields.Attachments && item?.item?.fields.Attachments.length >= 1) {
    return item?.item?.fields.Attachments[0].thumbnails?.[size].url
  } else if(item.fields.Attachments && item.fields.Attachments.length >= 1){
    return item.fields.Attachments[0].thumbnails?.[size].url
  }
    return null
}

const getTags = (project) => {
  let tags = []

  if(project.item?.fields.hasOwnProperty('Installation_type') || project.item?.fields.hasOwnProperty('Mots_clefs')){
    tags = tags.concat(project.item.fields.Installation_type, project.item.fields.Mots_clefs)
  }
  return tags
}

export { getImg, getTags }