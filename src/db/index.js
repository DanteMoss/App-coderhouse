import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('session.db')

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY_KEY NOT NULL, token TEXT NOT NULL, email TEXT NOT NULL)', 
      [],
      () => resolve(),
      (tx,error) => reject(tx, error))
    })
  })
  return promise
}

export const insertSession = ({ email, token, localId }) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO sessions (localId, token, email) VALUES (?, ?, ?);',
      [localId, token, email],
      (_, result) => resolve(result),
      (_, error) => reject(error)
      )
    })
  })
  return promise
}

export const fetchSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM sessions',
      [],
      (_, result) => resolve(result),
      (_, error) => reject(error)
      )
    })
  })
  return promise
}

export const deleteSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM sessions',
      [],
      (_, result) => resolve(result),
      (_, error) => reject(error)
      )
    })
  })
  return promise
}