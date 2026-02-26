import { useEffect, useRef, useState } from "react";
import {
  AddToHomeButton,
  AddToHomeText,
  AddToHomeWrapper,
  CloseButton,
  InstructionModalImage,
} from "./styles";
import { Avatar, DialogContentText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import nespressoIcon from "../../resources/icons/nespressoLogoIcon.png";
import CancelIcon from "@mui/icons-material/Cancel";
import IosShareIcon from "@mui/icons-material/IosShare";
import DialogWindow from "../dialogWindow/DialogWindow";
import StarIcon from "@mui/icons-material/Star";
import getDeviceType from "../../utils/getDeviceType";
import getBrowserType from "../../utils/getBrowserType";
// chrome pc
import pcChrome from "../../resources/img/instructions/pc_chrome.png";
// firefox pc
import pcFirefoxFirst from "../../resources/img/instructions/firefoxPC/firefox_first.png";
import pcFirefoxSecond from "../../resources/img/instructions/firefoxPC/firefox_second.png";
import pcFirefoxThird from "../../resources/img/instructions/firefoxPC/firefox_third.png";
// safari pc
import pcSafariFirst from "../../resources/img/instructions/safariPC/safari_first.png";
import pcSafariSecond from "../../resources/img/instructions/safariPC/safari_second.png";
// explorer pc
import pcExplorerFirst from "../../resources/img/instructions/explorerPC/explorer_first.png";
import pcExplorerSecond from "../../resources/img/instructions/explorerPC/explorer_second.png";
// chrome android
import androidChromeFirst from "../../resources/img/instructions/chromeAndroid/chrome_first.png";
import androidChromeSecond from "../../resources/img/instructions/chromeAndroid/chrome_second.png";
// explorer android
import explorerAndroidFirst from "../../resources/img/instructions/explorerAndroid/explorer_first.png";
import explorerAndroidSecond from "../../resources/img/instructions/explorerAndroid/explorer_second.png";
import explorerAndroidThird from "../../resources/img/instructions/explorerAndroid/explorer_third.png";
// firefox android
import firefoxAndroidFirst from "../../resources/img/instructions/firefoxAndroid/firefox_first.png";
import firefoxAndroidSecond from "../../resources/img/instructions/firefoxAndroid/firefox_second.png";
// safari ios
import safariIosFirst from "../../resources/img/instructions/safariIOS/safari_first.png";
import safariIosSecond from "../../resources/img/instructions/safariIOS/safari_second.png";

export default function AddToHomeDialog() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false);

  const isAppInstalled = useRef(
    typeof localStorage !== "undefined" &&
      JSON.parse(localStorage.getItem("isAppInstalled"))
      ? JSON.parse(localStorage.getItem("isAppInstalled"))
      : false
  );

  const setIsAppInstalled = (status) => {
    localStorage.setItem("isAppInstalled", status);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showInstructionModal = () => {
    setIsInstructionModalOpen(true);
  };

  const closeInstructionModal = () => {
    setIsInstructionModalOpen(false);
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      closeModal();
      setIsAppInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  useEffect(() => {
    if (!isAppInstalled.current || deferredPrompt) {
      showModal();
    }
  }, [deferredPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Показываем установочную подсказку пользователю
    } else {
      showInstructionModal();
    }
  };

  return (
    <>
      <AddToHomeWrapper className={isModalOpen ? "visible" : null}>
        <CloseButton onClick={closeModal}>
          <CancelIcon />
        </CloseButton>
        <Avatar
          src={nespressoIcon.src}
          alt="nespresso icon"
          variant="rounded"
        ></Avatar>
        <AddToHomeText component="div">
          Добавьте наш сайт на главный экран.
        </AddToHomeText>
        <AddToHomeButton onClick={handleInstallClick}>Добавить</AddToHomeButton>
      </AddToHomeWrapper>
      <AddToHomeInstructionModal
        isOpen={isInstructionModalOpen}
        handleClose={closeInstructionModal}
      />
    </>
  );
}

const defaultBrowserAndroid = (
  <>
    <DialogContentText>
      1. Откройте меню <MenuIcon /> на панели инструментов браузера
    </DialogContentText>
    <InstructionModalImage
      large={androidChromeFirst.src}
      small={androidChromeFirst.src}
    />
    <DialogContentText>
      2. Выберите пункт «Добавить на гл. экран»
    </DialogContentText>
    <InstructionModalImage
      large={androidChromeSecond.src}
      small={androidChromeSecond.src}
    />
  </>
);
const defaultBrowserPC = (
  <>
    <DialogContentText>
      1. Откройте меню <MenuIcon /> на панели инструментов браузера
    </DialogContentText>
    <DialogContentText>
      2. Наведите курсор мыши на «Закладки».
    </DialogContentText>
    <DialogContentText>
      3. Выберите пункт «Добавить страницу в закладки» (или сочетание горячих
      клавиш Ctrl+D).
    </DialogContentText>
    <InstructionModalImage large={pcChrome.src} small={pcChrome.src} />
  </>
);
const defaultBrowserIOS = (
  <>
    <DialogContentText>
      1. Откройте меню <IosShareIcon /> на панели инструментов браузера
    </DialogContentText>
    <DialogContentText>
      2. Нажмите на кнопку «На экран домой».
    </DialogContentText>
    <InstructionModalImage
      large={safariIosFirst.src}
      small={safariIosFirst.src}
    />
    <DialogContentText>
      3. Подтвердите добавление в закладки, нажав на кнопку «Добавить».
    </DialogContentText>
    <InstructionModalImage
      large={safariIosSecond.src}
      small={safariIosSecond.src}
    />
  </>
);

const deviceInstructionsList = {
  android: {
    firefox: (
      <>
        <DialogContentText>
          1. Откройте меню <MenuIcon /> на панели инструментов браузера
        </DialogContentText>
        <DialogContentText>
          2. Нажмите на «Добавить в ярлыки».
        </DialogContentText>
        <InstructionModalImage
          large={firefoxAndroidFirst.src}
          small={firefoxAndroidFirst.src}
        />
        <DialogContentText>
          3. Теперь при поиске, вы увидите наш сайт, в закреплённых и легко
          сможете получить к нему доступ!
        </DialogContentText>
        <InstructionModalImage
          large={firefoxAndroidSecond.src}
          small={firefoxAndroidSecond.src}
        />
      </>
    ),
    safari: defaultBrowserAndroid,
    chrome: defaultBrowserAndroid,
    explorer: (
      <>
        <DialogContentText>
          1. Откройте меню <MenuIcon /> на панели инструментов браузера
        </DialogContentText>
        <DialogContentText>
          2. Свайпните открывшееся окно влево.
        </DialogContentText>
        <InstructionModalImage
          large={explorerAndroidFirst.src}
          small={explorerAndroidFirst.src}
        />
        <DialogContentText>
          3. Нажмите на кнопку «Добавить на телефоне».
        </DialogContentText>
        <InstructionModalImage
          large={explorerAndroidSecond.src}
          small={explorerAndroidSecond.src}
        />
        <DialogContentText>
          4. Подтвердите установку приложения.
        </DialogContentText>
        <InstructionModalImage
          large={explorerAndroidThird.src}
          small={explorerAndroidThird.src}
        />
      </>
    ),
    default: defaultBrowserAndroid,
  },
  ios: {
    firefox: defaultBrowserIOS,
    safari: defaultBrowserIOS,
    chrome: defaultBrowserIOS,
    explorer: defaultBrowserIOS,
  },
  pc: {
    firefox: (
      <>
        <DialogContentText>
          1. Откройте меню <MenuIcon /> на панели инструментов браузера
        </DialogContentText>
        <InstructionModalImage
          large={pcFirefoxFirst.src}
          small={pcFirefoxFirst.src}
        />
        <DialogContentText>2. Нажмите ЛКМ на «Закладки».</DialogContentText>
        <InstructionModalImage
          large={pcFirefoxSecond.src}
          small={pcFirefoxSecond.src}
        />
        <DialogContentText>
          3. Выберите пункт «Добавить текущую вкладку в закладки» (или сочетание
          горячих клавиш Ctrl+D).
        </DialogContentText>
        <InstructionModalImage
          large={pcFirefoxThird.src}
          small={pcFirefoxThird.src}
        />
      </>
    ),
    safari: (
      <>
        <DialogContentText>
          1. Откройте меню <IosShareIcon /> на панели инструментов браузера
        </DialogContentText>
        <DialogContentText>
          2. Нажмите на кнопку «Добавить в закладки».
        </DialogContentText>
        <InstructionModalImage
          large={pcSafariFirst.src}
          small={pcSafariFirst.src}
        />
        <DialogContentText>
          3. Подтвердите добавление в закладки, нажав на кнопку «Done».
        </DialogContentText>
        <InstructionModalImage
          large={pcSafariSecond.src}
          small={pcSafariSecond.src}
        />
      </>
    ),
    chrome: defaultBrowserPC,
    explorer: (
      <>
        <DialogContentText>
          1. Откройте меню <MenuIcon /> на панели инструментов браузера
        </DialogContentText>
        <DialogContentText>2. Нажмите ЛКМ на «Избранное».</DialogContentText>
        <InstructionModalImage
          large={pcExplorerFirst.src}
          small={pcExplorerFirst.src}
        />
        <DialogContentText>
          3. Нажмите ЛКМ на <StarIcon /> «Добавить эту страницу в избранное»
        </DialogContentText>
        <InstructionModalImage
          large={pcExplorerSecond.src}
          small={pcExplorerSecond.src}
        />
      </>
    ),
  },
  default: defaultBrowserPC,
};

const AddToHomeInstructionModal = ({ isOpen, handleClose }) => {
  const content = deviceInstructionsList[getDeviceType()][getBrowserType()];

  return (
    <DialogWindow
      isOpen={isOpen}
      title={"Как добавить наш сайт"}
      handleClose={handleClose}
      buttons={[]}
    >
      {content}
    </DialogWindow>
  );
};
