FROM grafana/grafana:latest

COPY dashboards/prometheus_ds.yml /etc/grafana/provisioning/datasources/datasource.yml
COPY dashboards/dashboard.yaml /etc/grafana/provisioning/dashboards/main.yaml
COPY dashboards /var/lib/grafana/dashboards

CMD ["grafana-server", "--homepath=/usr/share/grafana"]