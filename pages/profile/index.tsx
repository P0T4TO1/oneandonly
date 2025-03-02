import { useContext } from "react";
import type { NextPage } from "next";

import { ShopLayout, FullScreenLoading, Profile } from "../../components";

import { useProfile } from "../../hooks";
import { AuthContext } from "../../context";
import { IUser } from "../../interfaces";

export const PageProfile: NextPage = () => {
  const { user } = useContext(AuthContext);
  const id = user?._id as string;

  const { userData, isLoading } = useProfile(id, {
    refreshInterval: 15 * 1000,
  });

  return (
    <ShopLayout
      title={"Mi Perfil"}
      pageDescription={
        "Esta es la página para consultar y editar el perfil de usuario"
      }
    >
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Profile userData={userData as IUser} />
      )}
    </ShopLayout>
  );
};

export default PageProfile;
