const getImg = (project, size = 'large') => {
  if (project?.item?.fields.Attachments && project?.item?.fields.Attachments.length >= 1) {
    return project?.item?.fields.Attachments[0].thumbnails?.[size].url
  } else if(project.fields?.Attachments && project.fields.Attachments.length >= 1){
      return project.fields?.Attachments[0].thumbnails?.[size].url
  }
  return null
}

const getTags = (project) => {
  let tags = []
  const {item} = project

  if(item === undefined){
    if(project.fields.hasOwnProperty('Installation_type')){
      tags = tags.concat(project.fields.Installation_type)
    }
    if(project.fields.hasOwnProperty('Mots_clefs')){
      tags = tags.concat(project.fields.Mots_clefs)
    }
  }
  if(item !== undefined){
    if(project.item.fields.hasOwnProperty('Installation_type')){
      tags = tags.concat(project.item.fields.Installation_type)
    }
    if(project.item.fields.hasOwnProperty('Mots_clefs')){
      tags = tags.concat(project.item.fields.Mots_clefs)
    }
  }
  return tags
}

export { getImg, getTags }