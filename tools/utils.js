const getImg = (project, size = 'large') => {
  if (project?.item?.fields.attachments && project?.item?.fields.attachments.length >= 1) {
    return project?.item?.fields.attachments[0].thumbnails?.[size].url
  } else if(project?.fields?.attachments && project?.fields.attachments.length >= 1){
      return project?.fields?.attachments[0].thumbnails?.[size].url
  }
  return null
}

const getTags = (project) => {
  let tags = []
  const {item} = project

  if(item === undefined){
    if(project.fields.hasOwnProperty('InstallationType')){
      tags = tags.concat(project.fields.InstallationType)
    }
    if(project.fields.hasOwnProperty('tags')){
      tags = tags.concat(project.fields.tags)
    }
  }
  if(item !== undefined){
    if(project.item.fields.hasOwnProperty('InstallationType')){
      tags = tags.concat(project.item.fields.InstallationType)
    }
    if(project.item.fields.hasOwnProperty('tags')){
      tags = tags.concat(project.item.fields.tags)
    }
  }
  return tags
}

export { getImg, getTags }