import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

export default function UpdateUser() {
  const { query } = useRouter();
  const { id } = query;
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const res = await fetch("/api/getUser?_id=" + id);
    setUser(await res.json());
    setIsLoading(false);
  }, [id]);

  const handleChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setUser({
        ...user,
        [name]: value
      });
    },
    [user]
  );

  const handleUpdate = useCallback(async () => {
    setIsLoading(true);

    await fetch("/api/updateUser/", {
      method: "PUT",
      body: JSON.stringify(user)
    });

    setIsLoading(false);
  }, [user]);

  return (
    <div className="container">
      <section className="section">
        <div className="columns">
          <div className="column is-6">
            <div className="field">
              <label htmlFor="" className="label">
                Name
              </label>
              <div className="control">
                <input
                  disabled={isLoading}
                  type="text"
                  name="name"
                  className="input"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="" className="label">
                Country
              </label>
              <div className="control">
                <input
                  disabled={isLoading}
                  type="text"
                  name="country"
                  className="input"
                  value={user.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <br />

            <div class="field is-grouped">
              <div class="control">
                <button
                  disabled={isLoading}
                  className="button is-dark"
                  onClick={handleUpdate}
                >
                  update
                </button>
              </div>
              <div class="control">
                <Link href="/users">
                  <button className="button is-default">back</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
