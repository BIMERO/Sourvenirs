import React, { useState } from "react";
import { useSnapshot } from "valtio";
import state from "../store";
import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "../config/motion";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import { reader } from "../config/helpers";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [isActiveTab, setIsActiveTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const [isActiveEditorTab, setIsActiveEditorTab] = useState("");

  const generateTabContent = () => {
    switch (isActiveEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            isGeneratingImg={isGeneratingImg}
            setIsGeneratingImg={setIsGeneratingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;
    if (!isActiveTab[decalType.filterTab]) {
      handleActiveTab(decalType.filterTab);
    }
  };

  const handleActiveTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !isActiveTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !isActiveTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setIsActiveTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setIsActiveEditorTab("");
      console.log(result);
    });
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setIsGeneratingImg(true);
      const reponse = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await reponse.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setIsGeneratingImg(false);
      setIsActiveEditorTab("");
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container glassmorphism tabs">
                {EditorTabs.map((tab) => {
                  return (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => {
                        setIsActiveEditorTab(tab.name);
                        console.log(tab.name);
                      }}
                    />
                  );
                })}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div>
            <CustomButton
              type={"filled"}
              title={"Go Back"}
              handleClick={() => (state.intro = true)}
              customStyles={"w-fit px-4 py-2.5 font-bold text-sm"}
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => {
              return (
                <Tab
                  key={tab.name}
                  tab={tab}
                  isFilterTab
                  isActiveTab={isActiveTab[tab.name]}
                  handleClick={() => handleActiveTab(tab.name)}
                />
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
