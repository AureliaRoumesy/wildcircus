import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, message, Button, Select } from 'antd';
import axios from 'axios';
import setHeaderToken from '../../Utils/tokenUtil';
import conf from '../../app.conf';

import { newArtistAction } from '../../Actions/artistAction';

function ArtistForm({ tokenApproved, dispatch }) {
  const { Option } = Select;
  const { TextArea } = Input;
  const formLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };
  const [firstnameArtist, setFirstnameArtist] = useState('');
  const [lastnameArtist, setLastnameArtist] = useState('');
  const [pictureArtist, setPictureArtist] = useState(0);
  const [bioArtist, setBioArtist] = useState('');
  const [specialityArtist, setSpecialityArtist] = useState('');
  const [formArtist, setFormArtist] = useState({});

  useEffect(() => {
    const formTemp = {
      firstnameArtist,
      lastnameArtist,
      pictureArtist,
      specialityArtist,
      bioArtist,
    };
    setFormArtist(formTemp);
  }, [firstnameArtist, lastnameArtist, pictureArtist, bioArtist, specialityArtist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHeaderToken(() => {
      axios.post(`${conf.url}/api/artist`, formArtist)
        .then((data) => {
          if (data) {
            const artistTemp = { ...formArtist, idArtist: data.data[0].id_artist };
            dispatch(newArtistAction(artistTemp));
            message.success("Artiste bien ajouté", 3);

          }
        })
        .catch(() => {
          message.error("Erreur lors de l'enregistrement de l'artiste.", 3);
        });
    });
  };


  return (
    <div>
      <h2>Ajouter un artiste</h2>
      <Form {...formLayout} onSubmit={handleSubmit}>
        <Form.Item >
          <Input
            placeholder="Nom"
            onChange={e => setFirstnameArtist(e.target.value)}
          />
        </Form.Item>
        <Form.Item >
          <Input
            placeholder="Prénom"
            onChange={e => setLastnameArtist(e.target.value)}
          />
        </Form.Item>
        <Form.Item >
          <Input
            placeholder="URL photo"
            onChange={e => setPictureArtist(e.target.value)}
          />
        </Form.Item>
        <Form.Item >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Spécialité"
            optionFilterProp="children"
            onChange={e => setSpecialityArtist(e)}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="clown">Clown</Option>
            <Option value="dompteur">Dompteur</Option>
            <Option value="acrobate">Acrobate</Option>
            <Option value="magicien">Magicien</Option>
            <Option value="jongleur">Jongleur</Option>
          </Select>
        </Form.Item>
        <Form.Item >
          <TextArea
            placeholder="Bio"
            autosize={{ minRows: 2, maxRows: 6 }}
            onChange={e => setBioArtist(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit"
            disabled={firstnameArtist && pictureArtist && bioArtist ? null : 'disabled'}
          >
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
const mapStateToProps = store => ({
  tokenApproved: store.token,
});


export default connect(mapStateToProps)(ArtistForm);
