import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Problem } from '../_models/problem';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProblemsUnauth(
    page?,
    itemsPerPage?
  ): Observable<PaginatedResult<Problem[]>> {
    const paginatedResult: PaginatedResult<Problem[]> = new PaginatedResult<
      Problem[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Problem[]>(this.baseUrl + 'problemsUnauth', {
        observe: 'response',
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getProblems(
    page?,
    itemsPerPage?,
    path?
  ): Observable<PaginatedResult<Problem[]>> {
    const paginatedResult: PaginatedResult<Problem[]> = new PaginatedResult<
      Problem[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (path) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      params = params.append('userId', user.id.toString());
    }

    return this.http
      .get<Problem[]>(this.baseUrl + 'problems', {
        observe: 'response',
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getProblem(id: number): Observable<Problem> {
    return this.http.get<Problem>(this.baseUrl + 'problems/' + id);
  }

  updateProblem(id: number, problem: Problem) {
    return this.http.put(this.baseUrl + 'problems/' + id, problem);
  }

  setMainPhoto(problemId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'problems/' + problemId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(problemId: number, id: number) {
    return this.http.delete(
      this.baseUrl + 'problems/' + problemId + '/photos/' + id
    );
  }

  registerProblem(userId: number, problem: Problem) {
    return this.http.post(this.baseUrl + 'problems/add/' + userId, problem);
  }
}
