# Test benchmarking

---

[[toc]]

## Apache Benchmark

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users/me
```

> **Note:** You should use server IP instead of `localhost` or `127.0.0.1` because the container is isolated from the host network.

### Parameters

- `-n`: Number of requests to perform
- `-c`: Number of multiple requests to perform at a time

Details about the parameters can be found [here](https://httpd.apache.org/docs/current/programs/ab.html). About docker image can be found [here](https://hub.docker.com/r/jordi/ab).

### Example

```bash
docker run --rm jordi/ab -n 2000 -c 50 -T application/json -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk1N2JiZWIwLTMyM2ItNGNhZi1iNDI0LTBlNWUxMzliMThjOSIsInJvbGUiOiIiLCJzZXNzaW9uSWQiOiJmZGE1Zjk3ZC02ODVhLTQ5ZDktYTJjMi1kOWFlNTFlZGQ2Y2EiLCJpYXQiOjE3MjI3NzE0MjIsImV4cCI6MTcyMjg1NzgyMn0.WjRnyeic_rxsZCSLvp1MfzpE5Bi8CYG6qeeA5OXFdbQ' -v 2 http://192.168.1.184:3000/api/v1/users/me
```
