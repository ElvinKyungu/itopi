import * as THREE from 'three'
import {
    CSS3DRenderer,
    CSS3DObject
 } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
 import { getImg, getTags } from './utils'

const createCssObject = (type, width, height) => {
  const obj = new THREE.Object3D
  const element = document.createElement( type )

  const css3dObject = new CSS3DObject( element )
  obj.css3dObject = css3dObject
  obj.add(css3dObject)

  const geometry = new THREE.PlaneGeometry( width, height )
  const material = new THREE.MeshBasicMaterial( {
    opacity: 0,
    transparent: true,
    color	: new THREE.Color( 0xffffff ),
  } )
  const mesh = new THREE.Mesh( geometry, material )
  obj.add( mesh )
  return obj
}

const imageobject = (width, height, url) => {
  const div = document.createElement( 'div' )
  const image = document.createElement('img')
  div.appendChild(image)

  div.style.width = width + 'px'
  div.style.height = height + 'px'
  div.style.overflow = 'hidden'
  div.style.backgroundColor = 'rgb(241 245 249)'
  div.style.borderTopLeftRadius = '0.75rem'
  div.style.borderTopRightRadius = '0.75rem'

  image.src = url
  image.style.width = width + 'px'
  image.style.height =  height + 'px'
  image.style.objectFit =  'cover'

  return div
}

const title = (text) => {
  const title = document.createElement( 'div' )

  title.style.fontSize = '0.875rem'
  title.style.lineHeight = '1.25rem'
  title.textContent = text
  
  return title
}

const tag = (text) => {
  const tag = document.createElement('div')
 
  tag.textContent = text
  tag.style.width = 'fit-content'
  tag.style.backgroundColor = 'rgb(254 226 226)'
  tag.style.borderRadius = '0.375rem'
  tag.style.borderWidth = '1px'
  tag.style.borderColor = 'rgb(0 0 0)'
  tag.style.paddingTop = '0.25rem'
  tag.style.paddingBottom = '0.25rem'
  tag.style.paddingLeft = '0.50rem'
  tag.style.paddingRight = '0.50rem'
  tag.style.fontSize = '0.60rem'
  
  return tag
}

const tags = (width, tagsList) => {
  const tags = document.createElement('div')

  tags.style.width = width + 'px'
  tags.style.marginTop = '0.25rem'
  tags.style.display = 'flex'
  tags.style.flexWrap = 'flex-wrap'
  tags.style.gap = '0.375rem'
  for (let newTag of tagsList) {
    tags.appendChild(tag(newTag))
  }
  return tags
}

const textZone = (width, height, project) => {
  const textZone = document.createElement( 'div' )

  textZone.style.width = width + 'px'
  textZone.style.height = height + 'px'
  textZone.style.borderTopWidth = '2px'
  textZone.style.borderColor = 'rgb(0 0 0)'
  textZone.style.paddingTop = '0.5rem'
  textZone.style.paddingLeft = '0.5rem'
  textZone.style.paddingRight = '0.5rem'

  const name = title(project.fields.Name)
  name.style.fontWeight = '500'

  const artiste = title(project.fields.Name)
  artiste.style.fontWeight = '600'

  textZone.appendChild(name)
  textZone.appendChild(artiste)

  textZone.appendChild(tags(width, getTags(project)))
  return textZone
}

const cardObject3D = (type, width, height, project) => {
  const card = createCssObject(type, width, height)

  card.css3dObject.element.style.width = width +'px'
  card.css3dObject.element.style.height = height+'px'
  card.css3dObject.element.style.backgroundColor = 'rgb(244, 244, 245)'
  card.css3dObject.element.style.borderRadius = '0.75rem'
  card.css3dObject.element.style.borderWidth = '2px'
  card.css3dObject.element.style.borderColor = 'rgb(0 0 0)'
  card.css3dObject.element.style.overflow = 'hidden'

  card.css3dObject.element.appendChild(imageobject(width, 240, getImg(project)))
  card.css3dObject.element.appendChild(textZone(width, 144, project))
  return card
}

export { cardObject3D }