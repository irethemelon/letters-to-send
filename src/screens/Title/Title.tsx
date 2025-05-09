import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";

export const Title = (): JSX.Element => {
  const [isEnvelopeClicked, setIsEnvelopeClicked] = useState(false);
  const [isTopFoldOpen, setIsTopFoldOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isEnvelopeDisappeared, setIsEnvelopeDisappeared] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLetterContentVisible, setIsLetterContentVisible] = useState(false);
  const [isLetterFlipped, setIsLetterFlipped] = useState(false);
  const [zhContent, setZhContent] = useState("");
  const [enContent, setEnContent] = useState("");

  useEffect(() => {
    fetch('/apology_zh.txt')
      .then(response => response.text())
      .then(text => setZhContent(text));
    
    fetch('/apology_en.txt')
      .then(response => response.text())
      .then(text => setEnContent(text));
  }, []);

  useEffect(() => {
    if (isEnvelopeDisappeared) {
      setTimeout(() => {
        setShowConfetti(true);
      }, 1000);
    }
  }, [isEnvelopeDisappeared]);

  const handleEnvelopeClick = () => {
    if (isLetterOpen) {
      setIsEnvelopeDisappeared(true);
      setTimeout(() => {
        setIsLetterContentVisible(true);
      }, 800);
    } else if (isTopFoldOpen) {
      setIsLetterOpen(true);
    } else if (isEnvelopeClicked) {
      setIsTopFoldOpen(true);
    } else {
      setIsEnvelopeClicked(true);
    }
  };

  const handleLetterClick = () => {
    setIsLetterFlipped(!isLetterFlipped);
  };

  return (
    <div className="bg-[#fcfcfe] min-h-screen">
      <div className="h-screen bg-[#48525821] relative overflow-x-hidden">
        <AnimatePresence>
          {!isEnvelopeClicked && (
            <motion.div 
              className="inline-flex flex-col items-center gap-6 absolute top-[10vh] sm:top-[15vh] md:top-[117px] left-1/2 -translate-x-1/2 w-full px-4 sm:px-0"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#373f45] rounded-none hover:bg-[#373f45]">
                <span className="[font-family:'Crimson_Text',Helvetica] font-bold text-[#d7e0e6] text-lg sm:text-xl text-center tracking-[0] leading-5 whitespace-nowrap">
                  April • 2025
                </span>
              </Badge>

              <div className="inline-flex flex-col items-center gap-4">
                <h1 className="[font-family:'Crimson_Text',Helvetica] font-bold text-[#373f45] text-4xl sm:text-5xl md:text-7xl text-center tracking-[-0.30px] leading-[normal]">
                  Brendan Wong
                </h1>

                <h2 className="[font-family:'Crimson_Text',Helvetica] font-semibold text-[#373f45] text-xl sm:text-2xl md:text-[32px] text-center tracking-[-0.30px] leading-[normal]">
                  亲启
                </h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isEnvelopeDisappeared && (
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: isEnvelopeClicked ? (isLetterOpen ? 25 : -150) : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full px-4 sm:px-0"
            >
              <Card 
                className="absolute w-[90vw] sm:w-[80vw] md:w-[756px] h-[300px] sm:h-[400px] md:h-[480px] top-[40vh] sm:top-[385px] left-1/2 -translate-x-1/2 shadow-[0px_0px_20px_#6873821a] rounded-none border-none cursor-pointer transform scale-90 sm:scale-100"
                onClick={handleEnvelopeClick}
              >
                <CardContent className="p-0">
                  <div className="relative h-full">
                    <div className="absolute w-full h-full top-0 left-0 bg-[#373f45] rounded-lg border-[0.75px] border-solid border-[#0b4a72]" />

                    <motion.div 
                      className="absolute w-[calc(100%-40px)] h-[calc(100%-20px)] top-[10px] left-[20px] bg-white rounded shadow-shadows-bottom-dark"
                      animate={{ y: isLetterOpen ? -200 : 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <img
                        className="absolute top-[5%] left-[5%] w-[15%] max-w-[111px]"
                        alt="Logo"
                        src="/logo.svg"
                      />

                      <p className="absolute w-[80%] top-[25%] left-[5%] [font-family:'Crimson_Text',Helvetica] font-normal text-black text-sm sm:text-base tracking-[0] leading-6">
                        {zhContent}
                      </p>
                    </motion.div>

                    <div className="absolute w-full h-[92%] top-[30px] left-0 bg-[url(/interior-color.svg)] bg-cover bg-center" />

                    <img
                      className="absolute w-full h-[62.5%] top-[37.5%] left-0"
                      alt="Bottom fold"
                      src="/bottom-fold.svg"
                    />

                    <motion.img
                      className="absolute w-full h-[61%] top-0 left-0 origin-top"
                      alt="Top fold"
                      src="/top-fold.svg"
                      style={{ zIndex: isLetterOpen ? -1 : 1 }}
                      animate={{ rotateX: isTopFoldOpen ? -180 : 0 }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="flex flex-col w-full items-center gap-2.5 absolute top-[27.5%] left-0" style={{ zIndex: isTopFoldOpen ? -1 : 2 }}>
                      <motion.img
                        className="relative w-[15%] max-w-[111px]"
                        alt="Logo"
                        src="/logo.svg"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isTopFoldOpen ? 0 : 1 }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isEnvelopeDisappeared && (
            <>
              <motion.div 
                className="absolute w-[90vw] sm:w-[80vw] md:w-[716px] h-[460px] top-[40vh] sm:top-[345px] left-1/2 -translate-x-1/2 bg-white rounded shadow-shadows-bottom-dark cursor-pointer transform scale-90 sm:scale-100"
                initial={{ height: 460, y: 0, opacity: 0 }}
                animate={{ 
                  height: 610, 
                  y: -140, 
                  opacity: 1,
                  rotateY: isLetterFlipped ? 180 : 0 
                }}
                transition={{ 
                  height: { duration: 0.8 },
                  y: { duration: 0.8 },
                  opacity: { duration: 2, delay: 0.4 },
                  rotateY: { duration: 0.8 }
                }}
                onClick={handleLetterClick}
              >
                <img
                  className="absolute top-[5%] left-[5%] w-[15%] max-w-[111px]"
                  alt="Logo"
                  src="/logo.svg"
                  style={{ transform: isLetterFlipped ? 'rotateY(180deg)' : 'none' }}
                />

                <motion.div 
                  className="absolute w-[80%] top-[25%] left-[5%] h-[65%] overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLetterContentVisible ? 1 : 0 }}
                  style={{ transform: isLetterFlipped ? 'rotateY(180deg)' : 'none' }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="[font-family:'Crimson_Text',Helvetica] font-normal text-black text-sm sm:text-base tracking-[0] leading-6 break-words">
                    {isLetterFlipped ? enContent : zhContent}
                  </p>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {showConfetti && (
                  <motion.img
                    src="/confetti.svg"
                    alt="Confetti"
                    className="absolute w-[100vw] sm:w-[1046px] h-auto sm:h-[482px] left-1/2 -translate-x-1/2 top-[calc(50%-371px)] pointer-events-none"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};