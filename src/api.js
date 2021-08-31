import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

import firebaseConfig from './firebaseconfig';
import Globais from './global';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const dbStorage = firebaseApp.storage();

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginAuth:async (email,password) => {
    let result = await firebase.auth().signInWithEmailAndPassword(email, password);
    return result;
  },

  createUser:async (email,password, nome, tipo, apelido, universidade) => {
    let result = ""
    let create = await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(data => {
      const uid = data.user.uid;

      db.collection('usuario')
        .doc(uid)
        .set({
          nome: nome,
          tipoUsuario: tipo,
          curso: "",
          sobre: "",
          avatarPhoto: "https://www.politize.com.br/wp-content/uploads/2016/08/imagem-sem-foto-de-perfil-do-facebook-1348864936180_956x5001.jpg",
          apelido: apelido,
          universidade: universidade
        })
        .then(() => {
          window.location.href = "http://localhost:3000/"
        });
    })
    .catch(error => {
        result = "error"
    });
    return result;
    },

    getUserState:async () => {
      return new Promise (resolve => {
        firebase.auth().onAuthStateChanged(resolve)
      });
    },

    signOut:async () => {
      firebase.auth().signOut()
    },

    currentUser:async () => {
      let result = await firebase.auth().currentUser;
      return result;
    },

    dataUser:async (uid) => {
      const result = await db.collection('usuario').doc(uid).get();
      return result;
    },

    getStorage:async (file, user) =>  {
      let result = "";
      await dbStorage.ref('images').child(user.uid).put(file)
      .then( async () => {
        dbStorage.ref('images').child(user.uid).getDownloadURL().then(function(url){
          db.collection('usuario').doc(user.uid)
          .set({
            avatarPhoto: url
          }, { merge: true})
        })
      })
      .catch(error => {
        console.log(error)
        result = error;
      })

      return result;      
    },

    editProfile:async (uid, universidade, apelido, avatar) => {
      let link;
      await dbStorage.ref('images').child(uid).put(avatar)
      .then( async () => {
        await dbStorage.ref('images').child(uid).getDownloadURL().then(function(url){
          link = url;
          db.collection('usuario').doc(uid).set({
            avatarPhoto: url,
            apelido: apelido,
            universidade: universidade
          }, {merge: true})
        })
      })
      .catch(error => {
        console.log(error)
      })
      return link;
    },

    editProfileWithoutFile:async (uid, universidade, apelido) => {
      await db.collection('usuario').doc(uid).set({
        apelido: apelido,
        universidade: universidade
      }, {merge: true})
    },

    setFile:async (uid, file) => {
      let link;
      await dbStorage.ref('arquivos').child(uid).put(file)
      .then( async () =>{
        await dbStorage.ref('arquivos').child(uid).getDownloadURL().then(function(url){
          link = url;
          db.collection('tcc').doc(uid).set({
            pdfURL: url
          }, {merge: true})
        })
      })
      .catch(error => {
        console.log(error)
      })

      return link;
    },

    createProject:async (nomeTcc, curso, dataUpload, uid, email, aluno1, aluno2, aluno3, aluno4, aluno5) => {
      await db.collection('tcc')
      .doc()
      .set({
        cursoTcc: curso,
        diaHorario: dataUpload,
        idUsuario1: aluno1,
        idUsuario2: aluno2,
        idUsuario3: aluno3,
        idUsuario4: aluno4,
        idUsuario5: aluno5,
        professor: email,
        nomeTcc: nomeTcc
      })
 
    },

    getTcc:async (email) => {
      let list = [];

      let results = await db.collection('tcc').get();
      results.forEach(result => {
        let data = result.data();
        if(data.professor == email || data.idUsuario1 == email || data.idUsuario2 == email || data.idUsuario3 == email || data.idUsuario4 == email || data.idUsuario5 == email){
          list.push({
            cursoTcc : data.cursoTcc,
            diaHorario: data.dataUpload,
            nomeTcc: data.nomeTcc,
            idTcc: result.id
          })
        }
      })
      return list;
    },

    getLinkTcc:async (uidTcc) => {
      let link;
      let results = await db.collection('tcc').doc(uidTcc).get();
      link = results.data().pdfURL;
      console.log(link);
      return link;
    },

    onChatMessage:async(uidTcc, setChatMessage) => {
      return await db.collection('tcc').doc(uidTcc).onSnapshot((doc) => {
        let data = doc.data();
        if(data.messages){
          setChatMessage(data.messages);
        }
      })
    },

    sendMessage:(tccUid, userUid, textMessage, displayName) => {
      let now = new Date();
      db.collection('tcc').doc(tccUid).update({
        messages:firebase.firestore.FieldValue.arrayUnion({
          author: userUid,
          text: textMessage,
          date: now,
          displayName: displayName
        })
      });
    }
};