import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, transitions, shadows } from "../../theme/colors";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  description?: string;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 300px);
  padding: 4rem 2rem;
  background: linear-gradient(135deg, ${colors.bgSecondary} 0%, ${colors.bgTertiary} 100%);
  border-radius: 12px;
`;

const ErrorContent = styled.div`
  max-width: 600px;
  text-align: center;
  background: ${colors.bgPrimary};
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: ${shadows.lg};

  .error-icon {
    font-size: 80px;
    color: ${colors.danger};
    margin-bottom: 1.5rem;
    animation: bounce 1.5s ease-in-out infinite;

    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  }

  .error-code {
    font-size: 5rem;
    font-weight: 700;
    color: ${colors.primary};
    margin: 0;
    line-height: 1;
    background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .error-title {
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.textPrimary};
    margin: 1.5rem 0 1rem 0;
    line-height: 1.3;
  }

  .error-description {
    font-size: 1rem;
    color: ${colors.textSecondary};
    margin: 0 0 2rem 0;
    line-height: 1.6;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;

    .btn {
      padding: 0.75rem 1.75rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 8px;
      transition: all ${transitions.normal};
      border: 2px solid ${colors.primary};
      background-color: transparent;
      color: ${colors.primary};
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        background-color: ${colors.primary};
        color: ${colors.bgPrimary};
        transform: translateY(-2px);
        box-shadow: ${shadows.md};
      }

      &.primary {
        background-color: ${colors.primary};
        color: ${colors.bgPrimary};
        border-color: ${colors.primary};

        &:hover {
          background-color: ${colors.primaryDark};
          border-color: ${colors.primaryDark};
        }
      }
    }
  }
`;

const ErrorDetails = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${colors.borderColor};
  font-size: 0.9rem;
  color: ${colors.textLight};

  p {
    margin: 0;
  }
`;

export default function ErrorPage({
  statusCode = 404,
  title = "Page Not Found",
  description = "Oops! The page you're looking for doesn't exist. It might have been moved or deleted.",
}: ErrorPageProps) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const getErrorContent = () => {
    switch (statusCode) {
      case 404:
        return {
          title: "Page Not Found",
          description: "The page you're looking for doesn't exist. It might have been moved or deleted.",
          icon: "🔍",
        };
      case 500:
        return {
          title: "Server Error",
          description: "Something went wrong on our end. Please try again later.",
          icon: "⚠️",
        };
      case 403:
        return {
          title: "Access Forbidden",
          description: "You don't have permission to access this resource.",
          icon: "🔐",
        };
      case 503:
        return {
          title: "Service Unavailable",
          description: "The service is temporarily unavailable. Please try again later.",
          icon: "🛠️",
        };
      default:
        return {
          title,
          description,
          icon: "❌",
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <ErrorContainer>
      <ErrorContent>
        <div className="error-icon">{errorContent.icon}</div>
        <h1 className="error-code">{statusCode}</h1>
        <h2 className="error-title">{errorContent.title}</h2>
        <p className="error-description">{errorContent.description}</p>

        <div className="button-group">
          <button className="btn primary" onClick={handleGoHome}>
            <HomeOutlined />
            Back to Home
          </button>
          <button className="btn" onClick={handleGoBack}>
            <ArrowLeftOutlined />
            Go Back
          </button>
        </div>

        <ErrorDetails>
          <p>
            Error Code: <strong>{statusCode}</strong>
          </p>
          <p>If this problem persists, please contact support.</p>
        </ErrorDetails>
      </ErrorContent>
    </ErrorContainer>
  );
}
