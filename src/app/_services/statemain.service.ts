import { Role } from '../_models/Role';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StateMainService {
    public disabled = {'page1': false, 'page2': true, 'page3': false};
}