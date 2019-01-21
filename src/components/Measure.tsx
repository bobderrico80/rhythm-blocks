import React from 'react';
import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetConnector } from 'react-dnd';
import NoteBlock, { OnNoteBlockRemoveFunction, DropType } from './NoteBlock';
import plus from '../assets/svg/ui/plus.svg';
import close from '../assets/svg/ui/close.svg';
import styles from './Measure.module.css';
import { NoteBlockDefinition, NoteBlockType } from '../lib/noteBlockDefinitions';

interface MeasureProps {
  index: number;
  beatsPerMeasure: number;
  totalDuration?: number;
  noteBlocks: NoteBlockDefinition[];
  connectDropTarget: ConnectDropTarget;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
  isComposerPlaying: boolean;
  onDropNoteBlock: (
    { measureIndex, noteBlockType }: { measureIndex: number; noteBlockType: NoteBlockType },
  ) => void;
  onNoteBlockRemove: OnNoteBlockRemoveFunction;
  onMeasureAdd: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMeasureRemove: (measureIndex: number) => void;
}

const defaultProps = {
  totalDuration: 0,
  showAddButton: false,
  showRemoveButton: false,
};

const Measure = ({
  index,
  noteBlocks,
  connectDropTarget,
  showAddButton,
  showRemoveButton,
  isComposerPlaying,
  onNoteBlockRemove,
  onMeasureAdd,
  onMeasureRemove,
}: MeasureProps) => {
  return connectDropTarget(
    <div className={styles.measureWrap}>
      <div className={styles.measure}>
        {noteBlocks.map((noteBlock, noteIndex) => (
          <NoteBlock
            key={noteBlock.id}
            index={noteIndex}
            measureIndex={index}
            isComposerPlaying={isComposerPlaying}
            onNoteBlockRemove={onNoteBlockRemove}
            noteBlockDefinition={noteBlock}
          />
        ))}
      </div>
      {showRemoveButton ? (
        <button className={styles.removeButton} onClick={() => onMeasureRemove(index)}>
          <img className={styles.removeButtonIcon} src={close} alt="Remove Measure" />
        </button>
      ) : null}
      {showAddButton ? (
        <button className={styles.addButton} onClick={onMeasureAdd}>
          <img className={styles.addButtonIcon} src={plus} alt="Add Measure" />
        </button>
      ) : null}
    </div>,
  );
};

Measure.defaultProps = defaultProps;

const dropSpec = {
  drop: (
    { index, onDropNoteBlock, totalDuration, beatsPerMeasure }: MeasureProps,
    monitor: DropTargetMonitor,
  ) => {
    const { noteBlockType, noteBlockDuration } = monitor.getItem();

    // Cancel drop if measure is full or will be full
    if (totalDuration === beatsPerMeasure || totalDuration + noteBlockDuration > beatsPerMeasure) {
      return;
    }

    onDropNoteBlock({
      measureIndex: index,
      noteBlockType,
    });
  },
};

const dropCollect = (connect: DropTargetConnector) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
};

export default DropTarget(
  [DropType.NOTE_BLOCK, DropType.PALETTE_NOTE_BLOCK],
  dropSpec,
  dropCollect,
)(Measure);
