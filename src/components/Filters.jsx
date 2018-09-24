import React, { Component } from 'react';

class FiltersComponent extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-title">Фильтр</div>
                <div className="filter-container">
                    <div className="filter-item">
                        <span className="filter-item-title">Исполнитель</span>
                        <select onChange={(e)=>{this.props.filterPlaylist(e.target.value, 'singer')}}>
                            <option value="" hidden>Все</option>
                            {
                                this.props.singers.map((singer) => {
                                    return (
                                        <option key={singer} value={singer}>{singer}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="filter-item">
                        <span className="filter-item-title">Жанр</span>
                        <select onChange={(e)=>{this.props.filterPlaylist(e.target.value, 'genre')}}>
                            <option value="" hidden>Все</option>
                            {
                                this.props.genres.map((genre) => {
                                    return (
                                        <option key={genre} value={genre}>{genre}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="filter-item">
                        <span className="filter-item-title">Год</span>
                        <select onChange={(e)=>{this.props.filterPlaylist(e.target.value, 'year')}}>
                            <option value="" hidden>Все</option>
                            {
                                this.props.years.map((year) => {
                                    return (
                                        <option key={year} value={year}>{year}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default FiltersComponent;
