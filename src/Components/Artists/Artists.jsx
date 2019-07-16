import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Card, Col, Row } from 'antd';
import conf from '../../app.conf';
import './Artist.css';

function Artists() {
  const { Meta } = Card;
  const [artistsList, setArtistsList] = useState([]);

  useEffect(() => {
    axios.get(`${conf.url}/api/artists`)
      .then((data) => {
        setArtistsList(data.data)
        console.log(data.data)
      })
      .catch(() => {
        message.error('Problème lors de la récupération des artistes.', 3);
      });
  }, []);

  return (
    <div>
      <h1>Découvrez nos artistes !!</h1>
      <Row>
        {artistsList && artistsList.map((artist, index) => (
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={artist.picture} alt={artist.picture} />}
            >
              <Meta title={`${artist.firstname} ${artist.lastname}`} description={artist.bio} />
              <p>{artist.speciality}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Artists;
