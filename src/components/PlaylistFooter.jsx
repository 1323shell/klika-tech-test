import React, { Component } from 'react';

class PlaylistFooterComponent extends Component {
    render() {
        return (
            <div className="playlist-footer-container">
                <div className="playlist-pages" onClick={(e) => this.props.switchBetweenPages(e)}>
                    <div className="arrow back">❮</div>
                    {this.props.pageDisplayed.map((page) => {
                        if (page === this.props.activePage) {
                            return(<div key={Math.random()} className="playlist-page active-page">{page}</div>);
                        } else if(page === "...") {
                            return(<div key={Math.random()} className="hidden-pages">{page}</div>);
                        } else {
                            return (<div key={Math.random()} className="playlist-page">{page}</div>);
                        }
                    })}
                    <div className="arrow forward">❯</div>
                </div>
                <div className="playlist-length">
                    <input
                        type="radio"
                        name="playlist-length"
                        id="playlist-length-10"
                        defaultChecked={true}
                        onChange={() => this.props.playlistLengthChange(10)}
                    />
                    <label htmlFor="playlist-length-10" className="playlist-length-item">10</label>
                    <input
                        type="radio"
                        name="playlist-length"
                        id="playlist-length-25"
                        onChange={() => this.props.playlistLengthChange(25)}
                    />
                    <label htmlFor="playlist-length-25" className="playlist-length-item">25</label>
                    <input
                        type="radio"
                        name="playlist-length"
                        id="playlist-length-50"
                        onChange={() => this.props.playlistLengthChange(50)}
                    />
                    <label htmlFor="playlist-length-50" className="playlist-length-item">50</label>
                    <input
                        type="radio"
                        name="playlist-length"
                        id="playlist-length-100"
                        onChange={() => this.props.playlistLengthChange(100)}
                    />
                    <label htmlFor="playlist-length-100" className="playlist-length-item">100</label>
                </div>
            </div>
        );
    }
}

export default PlaylistFooterComponent;
