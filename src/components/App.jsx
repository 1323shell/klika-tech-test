import React, { Component } from 'react';
import { firebaseData } from '../firebase.js';
import '../App.css';
import FiltersComponent from './Filters.jsx';
import PlaylistFooterComponent from './PlaylistFooter.jsx';

class App extends Component {
    constructor(props){
        super(props);

        firebaseData.ref('songs').on('value', snap => {
            /*get array of songs from a Firebase Database*/

            let songsArr = [];
            snap.forEach(savedSong => {
                songsArr.push(savedSong.val());
            });

            /*the next code as far as "this.state" isn't necessary if we fill in the arrays of "singers", "genres" and "years" manually*/
            /*select unique singers for an appropriate <select> element*/

            let singersObj = {},
                singersArr = [];

            songsArr.forEach((song) => {
                singersObj[song.singer] = song.singer;
            });

            for(let singer in singersObj) {
                singersArr.push(singersObj[singer]);
            }

            singersArr.sort((a,b) => {
                return a > b ? 1 : -1;
            });

            /*select unique genres for an appropriate <select> element*/

            let genresObj = {},
                genresArr = [];

            songsArr.forEach((song) => {
                genresObj[song.genre] = song.genre;
            });

            for(let genre in genresObj) {
                genresArr.push(genresObj[genre]);
            }

            genresArr.sort((a,b) => {
                return a > b ? 1 : -1;
            });

            /*create an array of years for an appropriate <select> element*/

            let firstYear = 2018;
            let yearsArr = [];
            while(firstYear > 1957) {
                yearsArr.push(firstYear--);
            }

            this.setState({
                songs: songsArr,
                songsFiltered: songsArr,
                singers: singersArr,
                genres: genresArr,
                years: yearsArr,
                pageCount: Math.ceil(songsArr.length / 10),
                pageDisplayed: this.pagination(10, songsArr)
            });
        });

        /*
            songs — array of all songs;
            songsFiltered — filtered array of songs;
            singers — array of singers for <select> element,
            genres — array of genres for <select> element,
            years — array of years for <select> element,
            sortField — name of the clicked field for sorting,
            selectedFiltersSinger — selected singer in the <select> element,
            selectedFiltersGenre — selected genre in the <select> element,
            selectedFiltersYear — selected year in the <select> element,
            playlistLength — maximal number of songs that can be displayed in the playlist,
            songsStartPosition — number of the first song that is displayed in the playlist,
            songsEndPosition — number of the last song that is displayed in the playlist,
            pageCount — amount of playlist's pages,
            pageDisplayed — array of playlist's pages that are displayed,
            activePage — activated page of playlist
        */

        this.state = {
            songs: [],
            songsFiltered: [],
            singers: [],
            genres: [],
            years: [],
            sortField: null,
            selectedFiltersSinger: null,
            selectedFiltersGenre: null,
            selectedFiltersYear: null,
            playlistLength: 10,
            songsStartPosition: 0,
            songsEndPosition: 10,
            pageCount: 0,
            pageDisplayed: [],
            activePage: 1
        };
    }

    /*sort the songs by the clicked field (singer, name of the song, genre, duration)*/

    sortPlaylist(e) {
        if (!e.target.tagName === 'TR') return;
        let target = e.target.closest('TD'),
            targetName = target.getAttribute('id');

        if (this.state.sortField === targetName) {
            /*if we click on the same field for sorting*/

            target.classList.toggle('checked');
            target.classList.toggle('checked-again');
        } else {
            target.classList.add('checked');
        }

        switch(targetName) {
            case 'singer':
                /*reset styles for unclicked fields*/

                if(this.state.sortField !== targetName) {
                    this.refs.song.classList.remove('checked');
                    this.refs.genre.classList.remove('checked');
                    this.refs.duration.classList.remove('checked');
                    this.refs.song.classList.remove('checked-again');
                    this.refs.genre.classList.remove('checked-again');
                    this.refs.duration.classList.remove('checked-again');
                }

                /*
                - save name of the clicked field;
                - sort array of songs by the clicked field (both ways);
                */

                this.setState({
                    sortField: targetName,
                    songsFiltered: target.classList.contains('checked') ?
                    this.state.songsFiltered.sort((a, b) => {
                        return a.singer.toLowerCase() > b.singer.toLowerCase() ? 1 : -1;
                    }) :
                    this.state.songsFiltered.sort((a, b) => {
                        return a.singer.toLowerCase() < b.singer.toLowerCase() ? 1 : -1;
                    })
                });
            break;

            case 'song':
                /*reset styles for unclicked fields*/

                if(this.state.sortField !== targetName) {
                    this.refs.singer.classList.remove('checked');
                    this.refs.genre.classList.remove('checked');
                    this.refs.duration.classList.remove('checked');
                    this.refs.singer.classList.remove('checked-again');
                    this.refs.genre.classList.remove('checked-again');
                    this.refs.duration.classList.remove('checked-again');
                }

                /*
                - save name of the clicked field;
                - sort array of songs by the clicked field (both ways);
                */

                this.setState({
                    sortField: targetName,
                    songsFiltered: target.classList.contains('checked') ?
                    this.state.songsFiltered.sort((a, b) => {
                        return a.song.toLowerCase() > b.song.toLowerCase() ? 1 : -1;
                    }) :
                    this.state.songsFiltered.sort((a, b) => {
                        return a.song.toLowerCase() < b.song.toLowerCase() ? 1 : -1;
                    })
                });
            break;

            case 'genre':
                /*reset styles for unclicked fields*/

                if(this.state.sortField !== targetName) {
                    this.refs.singer.classList.remove('checked');
                    this.refs.song.classList.remove('checked');
                    this.refs.duration.classList.remove('checked');
                    this.refs.singer.classList.remove('checked-again');
                    this.refs.song.classList.remove('checked-again');
                    this.refs.duration.classList.remove('checked-again');
                }

                /*
                - save name of the clicked field;
                - sort array of songs by the clicked field (both ways);
                */

                this.setState({
                    sortField: targetName,
                    songsFiltered: target.classList.contains('checked') ?
                    this.state.songsFiltered.sort((a, b) => {
                        return a.genre.toLowerCase() > b.genre.toLowerCase() ? 1 : -1;
                    }) :
                    this.state.songsFiltered.sort((a, b) => {
                        return a.genre.toLowerCase() < b.genre.toLowerCase() ? 1 : -1;
                    })
                });
            break;

            case 'duration':
                /*reset styles for unclicked fields*/

                if(this.state.sortField !== targetName) {
                    this.refs.singer.classList.remove('checked');
                    this.refs.song.classList.remove('checked');
                    this.refs.genre.classList.remove('checked');
                    this.refs.singer.classList.remove('checked-again');
                    this.refs.song.classList.remove('checked-again');
                    this.refs.genre.classList.remove('checked-again');
                }

                /*
                - save name of the clicked field;
                - sort array of songs by the clicked field (both ways);
                */

                this.setState({
                    sortField: targetName,
                    songsFiltered: target.classList.contains('checked') ?
                    this.state.songsFiltered.sort((a, b) => {
                        return a.duration.toLowerCase() > b.duration.toLowerCase() ? 1 : -1;
                    }) :
                    this.state.songsFiltered.sort((a, b) => {
                        return a.duration.toLowerCase() < b.duration.toLowerCase() ? 1 : -1;
                    })
                });
            break;
        }

        /*reset "songsStartPosition", "songsEndPosition", "activePage" and pageDisplayed*/

        this.setState({
            songsStartPosition: 0,
            songsEndPosition: this.state.playlistLength,
            activePage: 1,
            pageDisplayed: this.pagination(this.state.playlistLength, this.state.songsFiltered)
        });
    }

    /*filter the songs by the selected option(-s) of <select> element (singer, genre, year), where
    "filter" — selected value in the <select> element;
    "filterName" — title of this <select> element;
    */

    filterPlaylist = (filter, filterName) => {
        /*reset styles for all fields (singers, name of the song, genres, duration)*/

        if (this.state.sortField) {
            this.refs.singer.classList.remove('checked');
            this.refs.song.classList.remove('checked');
            this.refs.genre.classList.remove('checked');
            this.refs.duration.classList.remove('checked');
            this.refs.singer.classList.remove('checked-again');
            this.refs.song.classList.remove('checked-again');
            this.refs.genre.classList.remove('checked-again');
            this.refs.duration.classList.remove('checked-again');
        }

        this.setState({sortField: null});

        /*create a new array of songs that can be seen in the playlist*/

        let newSongsFiltered;

        if (filterName === 'year') {
            /*if there's a selected option in <select> element YEAR, filter an array of all songs*/

            newSongsFiltered = this.state.songs.filter((song) => {
                return song.year === filter;
            });

            /*if there's a selected option in <select> element GENRE, filter an array of previously filtered songs*/

            if (this.state.selectedFiltersGenre) {
                newSongsFiltered = newSongsFiltered.filter((song) => {
                    return song.genre === this.state.selectedFiltersGenre;
                });
            }

            /*if there's a selected option in <select> element SINGER, filter an array of previously filtered songs*/

            if (this.state.selectedFiltersSinger) {
                newSongsFiltered = newSongsFiltered.filter((song) => {
                    return song.singer === this.state.selectedFiltersSinger;
                });
            }

            /*save the selected year*/

            this.setState({selectedFiltersYear: filter});

        } else if (filterName === 'genre') {
            /*if there's a selected option in <select> element GENRE, filter an array of all songs*/

            newSongsFiltered = this.state.songs.filter((song) => {
                return song.genre === filter;
            });

            /*if there's a selected option in <select> element YEAR, filter an array of previously filtered songs*/

            if (this.state.selectedFiltersYear) {
                newSongsFiltered = newSongsFiltered.filter((song) => {
                    return song.year === this.state.selectedFiltersYear;
                });
            }

            /*if there's a selected option in <select> element SINGER, filter an array of previously filtered songs*/

            if (this.state.selectedFiltersSinger) {
                newSongsFiltered = newSongsFiltered.filter((song) => {
                    return song.singer === this.state.selectedFiltersSinger;
                });
            }

            /*save the selected genre*/

            this.setState({selectedFiltersGenre: filter});

        } else {
            /*if there's a selected option in <select> element SINGER, filter an array of all songs*/

            newSongsFiltered = this.state.songs.filter((song) => {
                return song.singer === filter;
            });

            /*if there's a selected option in <select> element YEAR, filter an array of previously filtered songs*/

            if (this.state.selectedFiltersYear) {
                newSongsFiltered = newSongsFiltered.filter((song) => {
                    return song.year === this.state.selectedFiltersYear;
                });
            }

            /*if there's a selected option in <select> element GENRE, filter an array of previously filtered songs*/

            if (this.state.selectedFiltersGenre) {
                newSongsFiltered = newSongsFiltered.filter((song) => {
                    return song.genre === this.state.selectedFiltersGenre;
                });
            }

            /*save the selected singer*/

            this.setState({selectedFiltersSinger: filter});
        }

        /*
        - save a new array of songs that can be seen in the playlist;
        - reset "songsStartPosition", "songsEndPosition" and "activePage";
        - update "pageCount";
        - update array of playlist's pages that are displayed;
        */

        this.setState({
            songsFiltered: newSongsFiltered,
            songsStartPosition: 0,
            songsEndPosition: this.state.playlistLength,
            activePage: 1,
            pageCount: Math.ceil(newSongsFiltered.length / this.state.playlistLength),
            pageDisplayed: this.pagination(this.state.playlistLength, newSongsFiltered)
        });
    };

    /*create new array of playlist's pages that are displayed, where
    "num" — maximal number of songs that can be displayed in the playlist
    "songsArr" — array of filtered songs
    */

    pagination(num, songsArr) {
        let pageDisplayedArr = [],
            pageCount = Math.ceil(songsArr.length / num);

        for (let i = 1; i <= pageCount; i++) {
            if (i === 5 && pageCount > 5) {
                pageDisplayedArr.push('...');
                pageDisplayedArr.push(pageCount);
                break;
            }
            pageDisplayedArr.push(i);
        }

        return pageDisplayedArr;
    }

    /*set new maximal number of songs that can be displayed in the playlist, where
    "num" — maximal number of songs that can be displayed in the playlist
    */

    playlistLengthChange = (num) => {
        this.setState({
            playlistLength: num,
            songsStartPosition: 0,
            songsEndPosition: num,
            activePage: 1,
            pageCount: Math.ceil(this.state.songsFiltered.length / num),
            pageDisplayed: this.pagination(num, this.state.songsFiltered)
        });
    };

    /*if the amount of pages is more than 5 update the array of playlist's pages that are displayed, where
    "buttonName" — name of a pressed button;
    "activePage" — number of a next (selected) page;
    */

    showHiddenPages(buttonName, activePage) {
        /*"pageDisplayedArr" — new "pageDisplayed"*/

        let pageDisplayedArr = [],
            pageCount = this.state.pageCount;

        if (buttonName === 'back') {
            for (let i = 1; i <= pageCount; i++) {

                /*at the beginning this condition adds "..." in "pageDisplayedArr" and increases "i" by a value of hidden pages*/
                if(i === 2 && activePage > 3) {
                    pageDisplayedArr.push('...');
                    i += activePage - 4;
                    continue;

                    /*at the end this condition adds "..." in "pageDisplayedArr" and increases "i" by a value of hidden pages*/
                } else if(i > activePage + 1) {
                    pageDisplayedArr.push('...');
                    pageDisplayedArr.push(pageCount);
                    break;
                }
                pageDisplayedArr.push(i);
            }
        }

        if (buttonName === 'forward') {
            for (let i = 1; i <= pageCount; i++) {

                /*at the beginning this condition adds "..." in "pageDisplayedArr" and increases "i" by a value of hidden pages*/
                if(i === 2) {
                    pageDisplayedArr.push('...');
                    i += activePage - 4;
                    continue;

                    /*at the end this condition adds "..." in "pageDisplayedArr" and increases "i" by a value of hidden pages*/
                } else if(i > activePage + 1 && i < pageCount) {
                    pageDisplayedArr.push('...');
                    pageDisplayedArr.push(pageCount);
                    break;
                }
                pageDisplayedArr.push(i);
            }
        }

        if (buttonName === 'number') {
            for (let i = 1; i <= pageCount; i++) {

                /*at the beginning this condition adds "..." in "pageDisplayedArr" and increases "i" by a value of hidden pages*/
                if(i === 2 && activePage > 3) {
                    pageDisplayedArr.push('...');
                    (activePage === pageCount) ? (i += activePage - 6) : (i += activePage - 4);
                    continue;

                    /*at the end this condition adds "..." in "pageDisplayedArr" and increases "i" by a value of hidden pages*/
                } else if(i === activePage + 2 && activePage < pageCount - 2) {
                    if (activePage === 1) {
                        pageDisplayedArr.push(3);
                        pageDisplayedArr.push(4);
                    }
                    pageDisplayedArr.push('...');
                    pageDisplayedArr.push(pageCount);
                    break;
                }
                pageDisplayedArr.push(i);
            }
        }

        /*set new array of playlist's pages that are displayed*/

        this.setState({pageDisplayed: pageDisplayedArr});
    }

    /*update the array of playlist's pages that are displayed*/

    switchBetweenPages = (e) => {
        let songsListLength = this.state.songsFiltered.length,
            playlistLength = this.state.playlistLength,
            start = this.state.songsStartPosition,
            end = this.state.songsEndPosition,
            activePage = this.state.activePage;

        if (e.target.classList.contains('back')) {
            if (activePage === 1) return;

            /*if the last page is displayed*/

            if (songsListLength === end) {
                /*if the last page isn't full*/
                this.setState({songsEndPosition: end - (songsListLength - start)});
            } else {
                this.setState({songsEndPosition: end - playlistLength});
            }

            /*set new value of "activePage" and "songsStartPosition"*/

            this.setState({
                activePage: activePage - 1,
                songsStartPosition: start - playlistLength
            });

            /*if the amount of pages is more than 5*/

            if (this.state.pageCount > 5 && activePage < this.state.pageCount - 1 && activePage > 3) {
                this.showHiddenPages('back', activePage - 1);
            }
        }

        if (e.target.classList.contains('forward')) {
            if (activePage === this.state.pageCount) return;

            /*set new value of "activePage" and "songsStartPosition"*/

            this.setState({
                activePage: activePage + 1,
                songsStartPosition: start + playlistLength
            });

            /*if the last page is displayed*/

            if (playlistLength > songsListLength - end) {
                /*if the last page isn't full*/
                this.setState({songsEndPosition: end + songsListLength - end});
            } else {
                this.setState({songsEndPosition: end + playlistLength});
            }

            /*if the amount of pages is more than 5*/

            if (this.state.pageCount > 5 && activePage > 2 && activePage < this.state.pageCount - 2) {
                this.showHiddenPages('forward', activePage + 1);
            }
        }

        if (e.target.classList.contains('playlist-page')) {
            let nextPage = +e.target.innerHTML;

            /*if we click on the same number of page*/

            if(this.state.activePage === nextPage) return;

            /*set new value of "activePage", "songsStartPosition" and "songsEndPosition"*/

            this.setState({
                songsStartPosition: (nextPage - 1) * playlistLength,
                songsEndPosition: nextPage * playlistLength,
                activePage: nextPage
            });

            /*if the amount of pages is more than 5*/

            if (this.state.pageCount > 5 && nextPage !== 2 && nextPage !== this.state.pageCount - 1) {
                this.showHiddenPages('number', nextPage);
            }
        }
    };

    render() {
    return (
      <div className="app">
          {this.state.songs.length ?
              <div className="app-container">
                  <div className="playlist">
                      <div className="playlist-title">Плейлист</div>
                      <div className="playlist-container">
                          <table className="playlist-table">
                              <thead>
                              <tr onClick={(e) => this.sortPlaylist(e)}>
                                  <td id="singer" ref="singer">Исполнитель</td>
                                  <td id="song" ref="song">Песня</td>
                                  <td id="genre" ref="genre">Жанр</td>
                                  <td id="duration" ref="duration">Продолжительность</td>
                              </tr>
                              </thead>
                              <tbody>
                              { this.state.songsFiltered.length !== 0 ?
                                  this.state.songsFiltered.slice(this.state.songsStartPosition, this.state.songsEndPosition).map((song, index) => {
                                      return (
                                          <tr key={index}>
                                              <td>{song.singer}</td>
                                              <td>{song.song}</td>
                                              <td>{song.genre}</td>
                                              <td>{song.duration}</td>
                                          </tr>
                                      )
                                  }) : null
                              }
                              </tbody>
                          </table>
                          <div className="playlist-footer">
                              {this.state.pageDisplayed.length ?
                                  <PlaylistFooterComponent switchBetweenPages={this.switchBetweenPages} playlistLengthChange={this.playlistLengthChange}
                                                           pageDisplayed={this.state.pageDisplayed} activePage={this.state.activePage} />
                                  : null}
                          </div>
                      </div>
                  </div>
                  <FiltersComponent filterPlaylist={this.filterPlaylist} singers={this.state.singers}
                                    genres={this.state.genres} years={this.state.years} />
              </div>
              : <div className="loader"></div>}
      </div>
    );
  }
}

export default App;
