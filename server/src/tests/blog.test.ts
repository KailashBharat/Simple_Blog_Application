import request from "supertest";
import Blog, { BlogType } from "../models/Blog";
import app from "../app";

describe("Testing Blog API's", () => {
  describe("GET /blog-all", () => {
    const spy = jest.spyOn(Blog, "find");

    it("should return all the blogs", (done) => {
      const resp: BlogType[] = [
        {
          title: "title 1",
          description: "description 1",
        },
        {
          title: "title 2",
          description: "description 2",
        },
      ];
      spy.mockResolvedValueOnce(resp as unknown[]);

      request(app)
        .get("/blog-all")
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.blogposts).toEqual(resp);
          done();
        });
    });

    it("should return that no blog posts were found", (done) => {
      const resp: BlogType[] = [];
      spy.mockResolvedValueOnce(resp as unknown[]);
      request(app)
        .get("/blog-all")
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.msg).toEqual("Blogposts not found");
          expect(spy).toHaveBeenCalled();
          done();
        });
    });
  });

  describe("POST /blog", () => {
    const spy = jest.spyOn(Blog, "create");

    it("should return an object saying that all the fields must be filled in", (done) => {
      request(app)
        .post("/blog")
        .send({ title: "title one" })
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toEqual(
            "Please fill in all the required fields"
          );
          done();
        });
    });

    it("should return successfully create a blog post", (done) => {
      const post: BlogType = {
        title: "Foo",
        description: "Bar",
      };

      spy.mockResolvedValueOnce(post as never);

      request(app)
        .post("/blog")
        .send(post)
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toEqual("Succesfully created post");
          expect(spy).toHaveBeenCalled();

          done();
        });
    });
  });

  describe("GET /blog", () => {
    const spy = jest.spyOn(Blog, "findById");

    it("should return an object saying that all the fields must be filled in", (done) => {
      request(app)
        .get("/blog")
        .send({})
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toEqual(
            "Please fill in all the required fields"
          );
          done();
        });
    });

    it("should return the desired blog post", (done) => {
      const resp: BlogType = {
        id: "123",
        title: "Foo",
        description: "Bar",
      };

      spy.mockResolvedValueOnce(resp as never);

      request(app)
        .get("/blog")
        .send({ id: "123" })
        .expect(200)
        .then((response) => {
          expect(response.body.blogpost.id).toEqual(resp.id);
          expect(spy).toHaveBeenCalled();
          done();
        });
    });
  });

  describe("PATCH /blog", () => {
    const spy = jest.spyOn(Blog, "findByIdAndUpdate");

    it("should return an object saying that all the fields must be filled in", (done) => {
      request(app)
        .patch("/blog")
        .send()
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toEqual(
            "Please fill in all the required fields"
          );
          done();
        });
    });

    it("should update the desired blog post", (done) => {
      const resp: BlogType = {
        id: "123",
        title: "updatedTitle",
        description: "Bar",
      };

      const update = {
        title: "updatedTitle",
      };

      spy.mockResolvedValueOnce(resp as never);

      request(app)
        .patch("/blog")
        .send({ id: "123", update })
        .expect(200)
        .then((response) => {
          expect(response.body.blogpost.id).toEqual(resp.id);
          expect(response.body.blogpost.title).toEqual(update.title);
          expect(spy).toHaveBeenCalled();
          done();
        });
    });
  });

  describe("DELETE /blog", () => {
    const spy = jest.spyOn(Blog, "deleteOne");

    it("should return an object saying that all the fields must be filled in", (done) => {
      request(app)
        .delete("/blog")
        .send()
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toEqual(
            "Please fill in all the required fields"
          );
          done();
        });
    });

    it("should delete the desired blog post", (done) => {
      const resp = {
        acknowledged: true,
        deletedCount: 1,
      };

      spy.mockResolvedValueOnce(resp as never);

      request(app)
        .delete("/blog")
        .send({ id: "123" })
        .expect(200)
        .then((response) => {
          expect(response.body.blogpost.deletedCount).toEqual(1);
          expect(spy).toHaveBeenCalled();
          done();
        });
    });
  });
});
