import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function CreateUser() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    country: ""
  });

  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreate = useCallback(async () => {
    setIsLoading(true);

    await fetch("/api/createUser/", {
      method: "POST",
      body: JSON.stringify(user)
    });

    setIsLoading(false);
    router.push("/users");
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
                  name="name"
                  type="text"
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
                  name="country"
                  type="text"
                  className="input"
                  value={user.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <br />

            <div className="field is-grouped">
              <div className="control">
                <button
                  disabled={isLoading}
                  className="button is-dark"
                  onClick={handleCreate}
                >
                  create
                </button>
              </div>
              <div className="control">
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
