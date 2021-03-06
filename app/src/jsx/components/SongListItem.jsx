import React from 'react';
import { ExpandButton } from './ExpandButton.jsx';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import PlayButton from './PlayButton.jsx';
import moment from 'moment';
import { STATE_DOWNLOADING } from '../fetchers/constants';

function isRTL(s){           
    var ltrChars    = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
        rtlChars    = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
        rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

    return rtlDirCheck.test(s);
};

export class SongListItem extends React.Component {
	render() {
		const rtl = isRTL(this.props.song.artistName) || isRTL(this.props.song.songName);
		let downloadedPercent, albumSongs;
		if (this.props.song.state === STATE_DOWNLOADING) {
			downloadedPercent = <span>{this.props.song.downloadedPercent}</span>;
			downloadedPercent = <div class="progress" style={{ width: this.props.song.downloadedPercent * 100 + '%' }}></div>;
		}

		if (this.props.song.songs) {
			albumSongs = (
				<div className="album-songs">
					<ListGroup fill className="song-list">
						{this.props.song.songs.map(part => (
							<ListGroupItem>
								<div class="song">
									<div className={rtl ? 'song-info rtl' : 'song-info'}>
										<b className="artist-name">{this.props.song.artistName}</b> 
										<span className="song-name">{part.name}</span>
									</div>
									<span className="song-duration to-right">{moment.utc(moment.duration(part.duration * 1000).as('milliseconds')).format('HH:mm:ss')}</span>
									<PlayButton song={part}/>
								</div>
							</ListGroupItem>
						))}
					</ListGroup>
				</div>
			);
		}

		return (
			<div className="song-list-item">
				<div className="song">
					{downloadedPercent}
					<ExpandButton disabled={this.props.song.songs === undefined}/>
					<div className="thumb"><img src={this.props.song.thumbnail}/></div>
					<div className={rtl ? 'song-info rtl' : 'song-info'}>
						<b className="artist-name">{this.props.song.artistName}</b> 
						<span className="song-name">{this.props.song.songName}</span>
					</div>
					<span className="song-date-added to-right">{moment(this.props.song.created).format('DD/MM/YY')}</span>
					<span className="song-duration">{moment.utc(moment.duration(this.props.song.duration * 1000).as('milliseconds')).format('HH:mm:ss')}</span>
					<PlayButton song={this.props.song}/>
				</div>
				{albumSongs}
			</div>
		)
	}
}