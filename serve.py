import os, http.server, socketserver
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist'))
PORT = 3000
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
