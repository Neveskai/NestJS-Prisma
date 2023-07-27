import axios from 'axios'

interface RequestOption {
  readonly url: string
  readonly body?: any
  readonly headers?: any
  readonly method?:
    | 'GET'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'PURGE'
    | 'LINK'
    | 'UNLINK'
}

export class HttpClientService {
  public async request<Response>(option: RequestOption): Promise<Response> {
    try {
      const payload = {
        method: option.method || 'GET',
        url: option.url,
        headers: option.headers,
        data: option.body,
      }

      const { status, data } = await axios(payload)

      return <Response>(<unknown>{
        status: status,
        data: data.data,
      })
    } catch (error) {
      return <Response>(<unknown>{
        status: error.response?.status,
      })
    }
  }
}
