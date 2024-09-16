import { FC } from 'react'
import { Film } from '../../api/Film'
import './FilmInfo.scss'

interface FilmInfoProps {
	film: Film
}

const FilmInfo: FC<FilmInfoProps> = ({ film }) => {
	return (
		<section className="film-info">
			<div className="container">
				<h2 className="film-info__title">О фильме</h2>
				<div className="film-info__table">
					<ul className="film-info__list">
						{film.language && (
							<li className="film-info__item">
								<div className="film-info__param-wrap">
									<span className="film-info__parameter">Язык оригинала</span>
								</div>
								<span className="film-info__value">{film.language}</span>
							</li>
						)}
						{film.budget && (
							<li className="film-info__item">
								<div className="film-info__param-wrap">
									<span className="film-info__parameter">Бюджет</span>
								</div>
								<span className="film-info__value">{film.budget}</span>
							</li>
						)}
						{film.revenue && (
							<li className="film-info__item">
								<div className="film-info__param-wrap">
									<span className="film-info__parameter">Выручка</span>
								</div>
								<span className="film-info__value">{film.revenue}</span>
							</li>
						)}
						{film.director && (
							<li className="film-info__item">
								<div className="film-info__param-wrap">
									<span className="film-info__parameter">Режиссёр</span>
								</div>
								<span className="film-info__value">{film.director}</span>
							</li>
						)}
						{film.production && (
							<li className="film-info__item">
								<div className="film-info__param-wrap">
									<span className="film-info__parameter">Продакшен</span>
								</div>
								<span className="film-info__value">{film.production}</span>
							</li>
						)}
						{film.awardsSummary && (
							<li className="film-info__item">
								<div className="film-info__param-wrap">
									<span className="film-info__parameter">Награды</span>
								</div>
								<span className="film-info__value">{film.awardsSummary}</span>
							</li>
						)}
					</ul>
				</div>
			</div>
		</section>
	)
}

export default FilmInfo
