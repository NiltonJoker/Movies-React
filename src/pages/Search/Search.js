import React, { useState, useEffect} from 'react'
import {Col, Row, Input} from 'antd';
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import MovieCatalog from '../../components/MovieCatalog'
import Footer from '../../components/Footer'
import {URL_API, API} from '../../utils/constants'
import { useDebounce } from 'use-debounce';

import './Search.scss'

function Search(props) {

  const {location, history} = props;
  const [movieList, setMovieList] = useState([])
  const [searchValue, setSearchValue] = useState("")
  useDebounce(searchValue, 3000);

  useEffect(() => {

    (async () => {
      const searchValue = queryString.parseUrl(location.search)
      const {s} = searchValue.query
      if(s){
        const response = await fetch(
          `${URL_API}/search/movie?api_key=${API}&language=es-ES&query=${s}&page=1`
        )
        const movies = await response.json()
        setSearchValue(s)
        setMovieList(movies)
      }
    })()
  },[location.search])


  const onChangeSearch = e => {
    setSearchValue(e.target.value)
    const urlParams = queryString.parse(location.search)
    urlParams.s = e.target.value
    history.push(`?${queryString.stringify(urlParams)}`)
  }

  return (
    <Row>
      <Col span={12} offset={6} className="search">
        <h1>Busca tu película</h1>
        <Input onChange={onChangeSearch} defaultValue={searchValue} placeholder={searchValue}/>
      </Col>
      {movieList.results && (
        <Row>
          <Col span={24}>
            <MovieCatalog movies={movieList}/>
          </Col>
        </Row>
      )}
      <Col span={24}>
        <Footer />
      </Col>
    </Row>
  )
}

export default withRouter(Search)