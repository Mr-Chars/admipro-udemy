import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/medico.model';

declare var swal:any;
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  swal:string;
  totalMedicos:number=0;

  constructor(
    public http:HttpClient,
    public _usuarioService:UsuarioService
  ) { }


  cargarMedicos(desde: number=0)
  {
    let url = URL_SERVICIOS+ "/medico?desde="+desde;

    return this.http.get(url)
              .map((resp:any)=>
              {
                this.totalMedicos=resp.total;
                return resp.medicos;
              });
  }

  cargarMedico(id: string)
  {
    let url = URL_SERVICIOS+ "/medico/"+id;

    return this.http.get(url)
              .map((resp:any)=> resp.medico);
  }


  buscarMedicos(termino:string)
  {
    let url=URL_SERVICIOS+ "/busqueda/coleccion/medico/"+termino;
    
    return this.http.get(url)
    .map((resp: any) => resp.medico);
  }

  borrarMedico(id:string)
  {
    let url=URL_SERVICIOS+ "/medico/"+id+"?token="+this._usuarioService.token;

    return this.http.delete(url)
              .map(resp=>
                {

                  swal("Médico borrado", "Médico borrado correctamente", "success");
                  return resp;
                });
  }

  guardarMedico(medico:Medico)
  {
    

    if(medico._id) //UPDATE
    {
      let url=URL_SERVICIOS+ "/medico/"+medico._id+"?token="+this._usuarioService.token;

      return this.http.put(url, medico)
                  .map((resp:any)=>
                  {
                    swal("Médico actualizado", medico.nombres, "success");
                    return resp.medico;
                  });

    }else{ //CREATE
      
      let url=URL_SERVICIOS+ "/medico?token="+this._usuarioService.token;

      return this.http.post(url,medico)
                .map((resp:any)=>
                  {
                    swal("Médico creado", medico.nombres, "success");
                    return resp.medico;
                  });

    }

  }

}
