import React, { Fragment, useState } from "react";
import { Tab } from "@headlessui/react";
import FormStep1 from "@/components/FormStep1";
import FormStep2 from "@/components/FormStep2";
import FormStep3 from "@/components/FormStep3";
import FormStep4 from "@/components/FormStep4";
import { motion } from "framer-motion";

const AddTrack = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (data, e) => {
    setFormData({ ...formData, ...data });
    setSelectedIndex(Number(e.target.id) + 1);
  };

  const tabHeadings = ["Details", "Genre/Time", "Cover Image", "Audio"];
  const tabsList = tabHeadings.map((tabTitle, i) => (
    <Tab
      key={i}
      className="px-6 py-2 rounded-lg border border-primaryRed ui-selected:bg-redHover focus-visible:outline-none"
    >
      {tabTitle}
    </Tab>
  ));

  return (
    <main className="col-start-3 col-end-13 row-start-1 row-end-7 grid grid-cols-10 grid-rows-6 w-full h-full">
      <Tab.Group
        as={Fragment}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <div className="col-start-1 col-end-11 row-start-1 row-end-2 self-end">
          <Tab.List className="grid grid-cols-4 gap-16 w-3/4 mx-auto">
            {tabsList}
          </Tab.List>
        </div>
        <div className="col-start-1 col-end-11 row-start-2 row-end-7 flex items-center justify-center">
          <Tab.Panels className="w-1/2">
              <Tab.Panel>
                <motion.div
                  initial={{ y: 10 ,opacity: 0 }}
                  animate={{ y: 0 ,opacity: 1 }}
                  exit={{ y: -10 ,opacity: 0 }}
                  transition={{ type: "tween", duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                >
                  <FormStep1 handleNext={handleNext} />
                </motion.div>
              </Tab.Panel>
              <Tab.Panel>
                <motion.div
                  initial={{ y: 10 ,opacity: 0 }}
                  animate={{ y: 0 ,opacity: 1 }}
                  exit={{ y: -10 ,opacity: 0 }}
                  transition={{ type: "tween", duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                >
                  <FormStep2 handleNext={handleNext} />
                </motion.div>
              </Tab.Panel>
              <Tab.Panel>
                <motion.div
                  initial={{ y: 10 ,opacity: 0 }}
                  animate={{ y: 0 ,opacity: 1 }}
                  exit={{ y: -10 ,opacity: 0 }}
                  transition={{ type: "tween", duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                >
                  <FormStep3 handleNext={handleNext} />
                </motion.div>
              </Tab.Panel>
              <Tab.Panel>
                <motion.div
                  initial={{ y: 10 ,opacity: 0 }}
                  animate={{ y: 0 ,opacity: 1 }}
                  exit={{ y: -10 ,opacity: 0 }}
                  transition={{ type: "tween", duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                >
                  <FormStep4 formData={formData} />
                </motion.div>
              </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </main>
  );
};

export default AddTrack;
