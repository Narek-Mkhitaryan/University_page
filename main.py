from flask import Flask, render_template, url_for, send_file
app = Flask("__name__")

@app.route('/')
def index():
        return render_template("index.html")

@app.route('/download')
def download():
    path = 'static/Profile.pdf'
    return send_file(path, as_attachment=True)

if __name__ =="__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
