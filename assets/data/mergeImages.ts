import LogImage from "../images/idle/log.png";
import NestImage from "../images/idle/nest.png";
import CopperImage from "../images/idle/copper-ore.png";
import TinImage from "../images/idle/tin-ore.png";
import EmeraldImage from "../images/idle/emerald.png";
import RubyImage from "../images/idle/ruby.png";
import DiamondImage from "../images/idle/diamond.png";
import type { MergeItems } from "@/definitions/merge";

export const mergeImages: MergeItems = {
  "1": LogImage,
  "2": NestImage,
  "4": CopperImage,
  "8": TinImage,
  "16": EmeraldImage,
  "32": RubyImage,
  "64": DiamondImage,
  "128": LogImage,
  "256": NestImage,
  "512": CopperImage,
  "1024": TinImage,
  "2048": EmeraldImage,
  "4096": RubyImage,
  "8192": DiamondImage,
};

export const getMergeImage = (number: string) => mergeImages[number];
