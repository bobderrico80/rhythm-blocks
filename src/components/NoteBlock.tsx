import React from 'react';
import { DragSource, ConnectDragSource, DragSourceConnector } from 'react-dnd';
import styles from './NoteBlock.module.css';
import { NoteBlockDefinition } from '../lib/noteBlockDefinitions';

export type OnNoteBlockRemoveFunction = (measureIndex: number, id?: string) => void;

export enum DropType {
  NOTE_BLOCK = 'NOTE_BLOCK',
  PALETTE_NOTE_BLOCK = 'PALETTE_NOTE_BLOCK',
}

interface NoteBlockProps {
  index: number;
  className: string;
  isPaletteNoteBlock?: boolean;
  isComposerPlaying: boolean;
  connectDragSource: ConnectDragSource;
  measureIndex: number;
  onNoteBlockRemove: OnNoteBlockRemoveFunction;
  noteBlockDefinition: NoteBlockDefinition;
}

const defaultProps = {
  isPaletteNoteBlock: false,
};

const NoteBlock = ({ className, connectDragSource, noteBlockDefinition }: NoteBlockProps) => {
  const { css, svg, alt } = noteBlockDefinition;
  return connectDragSource(
    <div className={`${styles.noteBlock} ${styles[css]} ${className}`}>
      <img src={svg} alt={alt} />
    </div>,
  );
};

NoteBlock.defaultProps = defaultProps;

const dragSpec = {
  beginDrag: (props: NoteBlockProps) => {
    return {
      noteBlockType: props.noteBlockDefinition.type,
      noteBlockDuration: props.noteBlockDefinition.duration,
    };
  },

  canDrag: (props: NoteBlockProps) => !props.isComposerPlaying,

  endDrag: ({
    isPaletteNoteBlock,
    measureIndex,
    noteBlockDefinition,
    onNoteBlockRemove,
  }: NoteBlockProps) => {
    if (onNoteBlockRemove && !isPaletteNoteBlock) {
      onNoteBlockRemove(measureIndex, noteBlockDefinition.id);
    }
  },
};

const dragCollect = (connect: DragSourceConnector) => {
  return {
    connectDragSource: connect.dragSource(),
  };
};

export default DragSource(
  ({ isPaletteNoteBlock }) =>
    isPaletteNoteBlock ? DropType.PALETTE_NOTE_BLOCK : DropType.NOTE_BLOCK,
  dragSpec,
  dragCollect,
)(NoteBlock);
