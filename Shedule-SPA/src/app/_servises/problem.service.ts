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

  getProblems(
    page?,
    itemsPerPage?,
    isMy?,
    problemParams?
  ): Observable<PaginatedResult<Problem[]>> {
    const paginatedResult: PaginatedResult<Problem[]> = new PaginatedResult<
      Problem[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    const user: User = JSON.parse(localStorage.getItem('user'));

    if (isMy) {
      params = params.append('userId', user.id.toString());
    }

    if (problemParams != null) {
        params = params.append('minDegree', problemParams.minDegree);
        params = params.append('maxDegree', problemParams.maxDegree);
        params = params.append('type', problemParams.type);
        params = params.append('orderBy', problemParams.orderBy);
    }

    const urlRequest = user != null ? 'problems' : 'problemsUnauth';

    return this.http
      .get<Problem[]>(this.baseUrl + urlRequest, {
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
