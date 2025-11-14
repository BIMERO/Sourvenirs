import React from "react";
import CustomButton from "./CustomButton";

const AIPicker = ({
  prompt,
  setPrompt,
  isGeneratingImg,
  setIsGeneratingImg,
  handleSubmit,
}) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="Enter your prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        cols={4}
      />
      <div className="flex flex-wrap gap-2">
        {isGeneratingImg ? (
          <CustomButton
            title={"Generating..."}
            type={"filled"}
            customStyles={"text-xs"}
          />
        ) : (
          <>
            <CustomButton
              type={"outline"}
              title={"AI Logo"}
              handleClick={() => handleSubmit("logo")}
              customStyles={"text-xs"}
            />

            <CustomButton
              type={"filled"}
              title={"AI Full"}
              handleClick={() => handleSubmit("full")}
              customStyles={"text-xs"}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
