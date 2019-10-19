type getElemPos = (obj: string) => { x: number; y: number };

type windowWidth = () => number;

type windowHeight = () => number;

type refWidth = (ref: string) => number;

type refHeight = (ref: string) => number;

type ref1BottomToRef2Top = (ref1: string, ref2: string) => number;

type refRightToScreenLeft = (ref: string) => number;

type refLeftToScreenLeft = (ref: string) => number;

type refBottomToScreenTop = (ref: string) => number;

type refTopToScreenTop = (ref: string) => number;

type refRightToScreenRight = (ref: string) => number;

type refLeftToScreenRight = (ref: string) => number;

type refBottomToScreenBottom = (ref: string) => number;

type refTopToScreenBottom = (ref: string) => number;

export interface composable {
  getElemPos: getElemPos;
  windowWidth: windowWidth;
  windowHeight: windowHeight;
  refWidth: refWidth;
  refHeight: refHeight;
  ref1BottomToRef2Top: ref1BottomToRef2Top;
  refRightToScreenLeft: refRightToScreenLeft;
  refLeftToScreenLeft: refLeftToScreenLeft;
  refBottomToScreenTop: refBottomToScreenTop;
  refTopToScreenTop: refTopToScreenTop;
  refRightToScreenRight: refRightToScreenRight;
  refLeftToScreenRight: refLeftToScreenRight;
  refBottomToScreenBottom: refBottomToScreenBottom;
  refTopToScreenBottom: refTopToScreenBottom;
}

export type scrollRegister = (callback: Function, delay: number) => number;

export type resizeRegister = (callback: Function, delay: number) => number;

export type alwaysStickLeft = (init: {
  ref: string;
  target: string;
  padding: number;
  stickOver: boolean;
}) => Function;

export type alwaysStickRight = (init: {
  ref: string;
  target: string;
  padding: number;
  stickOver: boolean;
}) => Function;

export type toTopAndBottomDistance = (init: {
  target: string;
  top: number;
  bottom: number;
  topPadding: number;
  bottomPadding: number;
}) => Function;

export type yBetweenTwoRef = (init: {
  ref1: string;
  target: string;
  ref2: string;
  padding: string;
  top: string;
}) => Function;

export type throttle = (delay: number, callback: Function) => Function;
