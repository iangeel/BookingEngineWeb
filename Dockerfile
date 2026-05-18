FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
COPY rooms.html /usr/share/nginx/html/rooms.html
COPY booking.html /usr/share/nginx/html/booking.html
COPY confirmation.html /usr/share/nginx/html/confirmation.html
COPY admin.html /usr/share/nginx/html/admin.html
COPY admin-panel.html /usr/share/nginx/html/admin-panel.html
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY assets /usr/share/nginx/html/assets

EXPOSE 8080
