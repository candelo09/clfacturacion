import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Membership } from '../interfaces/Membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private routeMembership = `${environment.apiUrl}memberships/`;

  private headers = new Headers();

  constructor(private http: HttpClient) { }


  // Get membership list
  public getMembership(): Observable<Membership[]> {
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    // this.headers.append('Access-Control-Allow-Origin', '*')
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    // this.headers.append('Autorization', `Bearer ${sessionStorage.getItem('token')}`)
    return this.http.get<Membership[]>(`${this.routeMembership}all`);

  }


  // Create membership
  public createMembership(membership: Membership): Observable<any> {

    return this.http.post<any>(`${this.routeMembership}save`, membership);

  }

  public updateMembership(membership: Membership) {
    return this.http.put(`${this.routeMembership}edit/${membership.id}`, membership);
  }

  public deleteByIdMembership(idMembership: number):Observable<any> {
    return this.http.delete<any>(`${this.routeMembership}delete/${idMembership}`);
  }
}
