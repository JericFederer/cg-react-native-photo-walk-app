import * as SQLite from 'expo-sqlite';

export async function init() {
  const db = await SQLite.openDatabaseAsync('places');

  const result = db.execAsync(
    `CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL)`,
  )

  return result;
}

export async function insertPlace(place) {
  const db = await SQLite.openDatabaseAsync('places');

  const place_test = {
    title: "test_title",
    imageUri: "test_imageUri",
    address: "test_address",
    location: {
      lat: 35.73038682521549,
      lng: 139.71048440784216
    }
  }

  const result = await db.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    place.title,
    place_test.imageUri,
    place_test.address,
    place_test.location.lat,
    place_test.location.lng,
  );

  return result;
}

export async function fetchPlaces() {
  const db = await SQLite.openDatabaseAsync('places');

  const result = await db.getAllAsync(
    `SELECT * FROM places`,
  )

  return result;
}

export async function fetchPlaceDetails(id) {
  const db = await SQLite.openDatabaseAsync('places');

  const result = await db.getFirstAsync(
    `SELECT * FROM places where id = ?`,
    id
  )

  return result;
}