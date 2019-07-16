import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, DatePicker, message, Button, Table } from 'antd';
import axios from 'axios';
import setHeaderToken from '../../Utils/tokenUtil';
import conf from '../../app.conf';

function EventForm({ tokenApproved, newArtist }) {
  const { TextArea } = Input;
  const formLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
  };
  const [nameEvent, setNameEvent] = useState('');
  const [capacityEvent, setCapacityEvent] = useState(0);
  const [addressEvent, setAddressEvent] = useState('');
  const [dateEvent, setDateEvent] = useState('');
  const [descriptionEvent, setDescriptionEvent] = useState('');
  const [formEvent, setFormEvent] = useState({});
  const [artistsSelected, setArtitsSelected] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const columns = [
    {
      title: 'Prénom',
      dataIndex: 'firstname',
    },
    {
      title: 'Nom',
      dataIndex: 'lastname',
    },
    {
      title: 'Spécialité',
      dataIndex: 'speciality',
    },
  ];
  useEffect(() => {
    setHeaderToken(() => {
      axios.get(`${conf.url}/api/artists`)
      .then((data) => {
        setArtistsList(data.data)
      })
      .catch(() => {
        message.error('Problème lors de la récupération des artistes.', 3);
      });
    });
  }, []);

  useEffect(() => {
    const dataTemp = {
      id: newArtist.idArtist,
      firstname: newArtist.firstnameArtist,
      lastname: newArtist.lastnameArtist,
      speciality: newArtist.specialityArtist,
    }
    const arrayTemp = [...artistsList, dataTemp];
    setArtistsList(arrayTemp);
  }, [newArtist]);

  useEffect(() => {
    const formTemp = {
      nameEvent,
      capacityEvent,
      dateEvent,
      addressEvent,
      artistsSelected,
      descriptionEvent,
    };
    setFormEvent(formTemp);
  }, [nameEvent, capacityEvent, dateEvent, addressEvent, descriptionEvent, artistsSelected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHeaderToken(() => {
    axios.post(`${conf.url}/api/event`, formEvent)
      .then((res) => {
        if (res.status === 200) {
        message.success("Evènnement bien ajouté", 3);
        }
      })
      .catch(() => {
        message.error("Erreur lors de l'enregistrement de l'évènnement.", 3);
      });
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setArtitsSelected(selectedRows)
      console.log(selectedRows)
    },
  };

  return (
    <div>
      <h2>Ajouter une date de spectacle</h2>
      <Form {...formLayout} onSubmit={handleSubmit}>
        <Form.Item >
          <Input
            placeholder="Nom"
            onChange={e => setNameEvent(e.target.value)}
          />
        </Form.Item>
        <Form.Item >
          <Input
            placeholder="Capacité"
            onChange={e => setCapacityEvent(e.target.value)}
          />
        </Form.Item>
        <Form.Item >
          <Input
            placeholder="Adresse"
            onChange={e => setAddressEvent(e.target.value)}
          />
        </Form.Item>
        <Form.Item >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={e => setDateEvent(e._d)} />
        </Form.Item>
        <Form.Item >
          <TextArea
            placeholder="Description du show"
            autosize={{ minRows: 2, maxRows: 6 }}
            onChange={e => setDescriptionEvent(e.target.value)}
          />
        </Form.Item>
        <p>Selectionne les artistes présent:</p>
        <Table rowSelection={rowSelection} columns={columns} dataSource={artistsList} pagination={false}/>
        <Form.Item>
          <Button type="primary" htmlType="submit"
          disabled={nameEvent && capacityEvent && addressEvent && dateEvent && descriptionEvent && artistsSelected ? null : 'disabled'}
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
  newArtist: store.artist.newArtist,
});


export default connect(mapStateToProps)(EventForm);
