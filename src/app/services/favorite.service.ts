import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Data {
  name: string;
  pokeIndex: number;
  image: string;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private firestore: Firestore) {}

  getFavorite(): Observable<Data[]> {
    const noteRef = collection(this.firestore, 'favorites');

    return collectionData(noteRef, { idField: 'id' }) as Observable<Data[]>;
  }

  AddFavorite(note: Data) {
    const noteRef = collection(this.firestore, 'favorites');

    return addDoc(noteRef, note);
  }

  deleteNote(note: Data) {
    const noteDocRef = doc(this.firestore, `favorites/${note.id}`);
    return deleteDoc(noteDocRef);
  }
}
