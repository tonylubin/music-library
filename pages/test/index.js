import React from 'react'
import { Tab } from '@headlessui/react'

const Test = () => {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Info</Tab>
        <Tab>Image</Tab>
        <Tab>Audio</Tab>
        <Tab>Result</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Info - content</Tab.Panel>
        <Tab.Panel>Image - content</Tab.Panel>
        <Tab.Panel>Audio - content</Tab.Panel>
        <Tab.Panel>Result - content</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Test