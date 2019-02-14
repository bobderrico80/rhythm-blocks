import React, { ReactElement } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { createSnapshot } from '../testUtils';
import PlaybackState from '../lib/PlaybackState';
import Player, { PlayerProps } from './Player';
import { MeasureDefinition } from '../lib/createMeasureDefinitions';
import createNoteBlockDefinitions from '../lib/createNoteBlockDefinitions';
import { NoteBlockType } from '../lib/noteBlockDefinitions';

jest.mock('../lib/PlaybackHandler');

describe('The <Player /> component', () => {
  const testMeasures: MeasureDefinition[] = [
    {
      totalDuration: 4,
      noteBlocks: createNoteBlockDefinitions([
        NoteBlockType.QUARTER_NOTE,
        NoteBlockType.QUARTER_NOTE,
        NoteBlockType.QUARTER_NOTE,
        NoteBlockType.QUARTER_NOTE,
      ]),
      beatsPerMeasure: 4,
    },
  ];

  let component: ReactElement<any>;
  let wrapper: ShallowWrapper<Readonly<PlayerProps>>;
  let instance: Player;
  let onPlaybackStateChange: jest.Mock;

  beforeEach(() => {
    onPlaybackStateChange = jest.fn();
    component = (
      <Player
        measures={testMeasures}
        playbackState={PlaybackState.STOPPED}
        onPlaybackStateChange={onPlaybackStateChange}
      />
    );
    wrapper = shallow<Player>(component);
    instance = wrapper.instance() as Player;
  });

  describe('with default behavior (in STOPPED state)', () => {
    it('renders as expected', () => expect(createSnapshot(component)).toMatchSnapshot());

    it('calls playbackHandler.scheduleMeasures() with the measures prop on mount', () => {
      expect(instance.playbackHandler.scheduleMeasures).toHaveBeenCalledWith(testMeasures);
    });

    it('sets up Transport `start` event listener on mount', () => {
      expect(instance.playbackHandler.Transport.on).toHaveBeenCalledWith(
        'start',
        expect.any(Function),
      );
    });

    it('sets up Transport `stop` event listener on mount', () => {
      expect(instance.playbackHandler.Transport.on).toHaveBeenCalledWith(
        'stop',
        expect.any(Function),
      );
    });

    it('re-schedules measures when props are updated', () => {
      const updatedMeasures = [
        {
          totalDuration: 4,
          beatsPerMeasure: 4,
          noteBlocks: createNoteBlockDefinitions(NoteBlockType.WHOLE_NOTE),
        },
      ];
      wrapper.setProps({ measures: updatedMeasures });
      expect(instance.playbackHandler.scheduleMeasures).toHaveBeenLastCalledWith(updatedMeasures);
    });

    it('calls onPlaybackStateChange with PLAYING state when `start` event occurs', () => {
      const onMockFn = instance.playbackHandler.Transport.on as jest.Mock;
      onMockFn.mock.calls[0][1](); // Call the 'start' Transport event callback
      expect(onPlaybackStateChange).toHaveBeenCalledWith(PlaybackState.PLAYING);
    });

    it('calls onPlaybackStateChange with STOPPED state when `stop` event occurs', () => {
      const onMockFn = instance.playbackHandler.Transport.on as jest.Mock;
      onMockFn.mock.calls[1][1](); // Call the 'stop' Transport event callback
      expect(onPlaybackStateChange).toHaveBeenCalledWith(PlaybackState.STOPPED);
    });

    describe('button clicking behavior', () => {
      beforeEach(() => {
        wrapper.find('button').simulate('click');
      });

      it('calls playbackHandler.startPlayback()', () => {
        expect(instance.playbackHandler.startPlayback).toHaveBeenCalledTimes(1);
      });

      it('does not call playbackHandler.stopPlayback()', () => {
        expect(instance.playbackHandler.stopPlayback).not.toHaveBeenCalled();
      });
    });

    describe('when unmounting', () => {
      beforeEach(() => {
        wrapper.unmount();
      });

      it('removes `start` event handler', () => {
        expect(instance.playbackHandler.Transport.off).toHaveBeenCalledWith('start');
      });

      it('removes `stop` event handler', () => {
        expect(instance.playbackHandler.Transport.off).toHaveBeenCalledWith('stop');
      });
    });
  });

  describe('during playback', () => {
    beforeEach(() => {
      component = (
        <Player
          measures={testMeasures}
          playbackState={PlaybackState.PLAYING}
          onPlaybackStateChange={onPlaybackStateChange}
        />
      );
      wrapper = shallow(component);
      instance = wrapper.instance() as Player;
    });

    it('renders as expected', () => expect(createSnapshot(component)).toMatchSnapshot());

    describe('button clicking behavior', () => {
      beforeEach(() => {
        wrapper.find('button').simulate('click');
      });

      it('calls playbackHandler.stopPlayback()', () => {
        expect(instance.playbackHandler.stopPlayback).toHaveBeenCalledTimes(1);
      });

      it('does not call playbackHandler.startPlayback()', () => {
        expect(instance.playbackHandler.startPlayback).not.toHaveBeenCalled();
      });
    });
  });

  describe('with no measures', () => {
    beforeEach(() => {
      component = (
        <Player
          measures={[]}
          playbackState={PlaybackState.PLAYING}
          onPlaybackStateChange={onPlaybackStateChange}
        />
      );
      wrapper = shallow(component);
      instance = wrapper.instance() as Player;
    });

    it('does not call playbackHandler.scheduleMeasures()', () => {
      expect(instance.playbackHandler.scheduleMeasures).not.toHaveBeenCalled();
    });

    describe('button clicking behavior', () => {
      beforeEach(() => {
        wrapper.find('button').simulate('click');
      });

      it('does not call playbackHandler.startPlayback()', () => {
        expect(instance.playbackHandler.startPlayback).not.toHaveBeenCalled();
      });

      it('does not call playbackHandler.stopPlayback()', () => {
        expect(instance.playbackHandler.stopPlayback).not.toHaveBeenCalled();
      });
    });
  });

  describe('with empty measures', () => {
    beforeEach(() => {
      component = (
        <Player
          measures={[
            {
              totalDuration: 0,
              noteBlocks: [],
              beatsPerMeasure: 4,
            },
          ]}
          playbackState={PlaybackState.PLAYING}
          onPlaybackStateChange={onPlaybackStateChange}
        />
      );
      wrapper = shallow(component);
      instance = wrapper.instance() as Player;
    });

    it('does not call playbackHandler.scheduleMeasures()', () => {
      expect(instance.playbackHandler.scheduleMeasures).not.toHaveBeenCalled();
    });

    describe('button clicking behavior', () => {
      beforeEach(() => {
        wrapper.find('button').simulate('click');
      });

      it('does not call playbackHandler.startPlayback()', () => {
        expect(instance.playbackHandler.startPlayback).not.toHaveBeenCalled();
      });

      it('does not call playbackHandler.stopPlayback()', () => {
        expect(instance.playbackHandler.stopPlayback).not.toHaveBeenCalled();
      });
    });
  });
});
